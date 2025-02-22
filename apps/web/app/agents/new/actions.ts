"use server";

import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import JSZip from "jszip";
import { auth } from "@/auth";
import { EXCLUDED_FILES } from "@/utils/data";
import { z } from "zod";
import { createSupabaseClient } from "@/lib/supabaseClient";

async function fetchRepoZip(owner: string, repo: string) {
  const session = await auth();
  const accessToken = session?.githubAccessToken || process.env.GITHUB_API_KEY;

  // First, get the default branch
  const repoInfoResponse = await fetch(
    `https://api.github.com/repos/${owner}/${repo}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "User-Agent": "InDocify",
      },
    }
  );

  if (!repoInfoResponse.ok) {
    throw new Error(
      `Failed to fetch repository info: ${repoInfoResponse.statusText}`
    );
  }

  const repoInfo = await repoInfoResponse.json();
  const defaultBranch = repoInfo.default_branch;
  console.log("defaultBranch", defaultBranch);

  // Then fetch the ZIP using the default branch
  const zipUrl = `https://github.com/${owner}/${repo}/archive/${defaultBranch}.zip`;
  const response = await fetch(zipUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "InDocify",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch repository ZIP: ${response.statusText}`);
  }

  return await response.arrayBuffer();
}

async function extractZip(zipData: ArrayBuffer) {
  const zip = await JSZip.loadAsync(zipData);
  const files: Array<{ path: string; content: string }> = [];

  // Iterate through all files in the ZIP
  zip.forEach((relativePath, file) => {
    if (!file.dir) {
      // Ignore directories

      // Check if the file should be excluded
      const isExcluded = EXCLUDED_FILES.some((excluded) => {
        if (excluded.startsWith("*")) {
          // Handle wildcard patterns (e.g., *.png)
          return relativePath.endsWith(excluded.slice(1));
        } else {
          // Handle exact matches (e.g., node_modules)
          return relativePath.includes(excluded);
        }
      });

      if (!isExcluded) {
        // Only include files that are not excluded
        files.push({
          path: relativePath,
          content: file.async("text") as any, // Extract file content as text
        });
      }
    }
  });

  // Wait for all files to be processed
  const fileContents = await Promise.all(
    files.map(async (file) => ({
      path: file.path,
      content: await file.content,
    }))
  );

  return fileContents;
}

export async function fetchAndProcessZipRepo(owner: string, repo: string) {
  try {
    // Step 1: Fetch the repository ZIP
    const zipData = await fetchRepoZip(owner, repo);
    // Step 2: Extract files from the ZIP
    const files = await extractZip(zipData);
    return files;
  } catch (error) {
    console.error("Error processing repository:", error);
  }
}

export async function generateDocs(readmeFileContent: string) {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system: `
        You are to generate a project overview based on the provided README file content.
        The project overview must be a summarized version of the projects readme content.
        If the README file is not present, let the user know unfortunately you were not able to generate a project overview.
    `,
    prompt: `
      **Readme file content**:
      ${readmeFileContent}
    `,
  });

  return result.text;
}

// can you craft an agent called generate Started Docs for a project?
export async function generateGetStartedDocs(repo: string) {
  const session = await auth();
  const supabase = createSupabaseClient(session?.supabaseAccessToken as string);

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system: `
       You are a technical documentation expert specialized in creating "Getting Started" guides by analyzing repository content through a database interface. Your primary task is to generate comprehensive setup documentation using the repository's actual files and content.
      The name of the repository is: ${repo}

      **Role and Capabilities:**
      - You can search and retrieve file contents from the repository using the provided tools
      - You analyze repository structure and content to create accurate documentation
      - You focus on actual implementation details found in the codebase

      **Available Tools:**
      - searchFiles: Use this to find relevant files and their contents based on keywords
      - Additional tools may be provided for deeper repository analysis

      **Documentation Generation Process:**

      1. Initial Repository Analysis
        - Search for key configuration files (package.json, requirements.txt, etc.)
        - Locate README files and existing documentation
        - Identify main entry points and setup scripts

      2. Project Overview
        - Extract project description from README or package files
        - List actual features based on codebase analysis
        - Identify the tech stack from dependency files

      3. Prerequisites (based on actual project dependencies)
        - List exact versions of required software and tools
        - Extract system requirements from configuration files
        - Document specific API keys or services used in the project

      4. Installation Steps
        - Provide accurate installation commands from package files
        - Include actual environment variables found in .env.example or similar files
        - Document real configuration steps based on project structure

      5. Configuration Details
        - Document actual configuration options found in the codebase
        - Provide real examples from existing configuration files
        - Explain environment variables used in the project

      6. Quick Start Guide
        - Include real commands found in package scripts
        - Provide working examples based on actual implementation
        - Document actual startup procedures

      7. Development Setup
        - Detail real development workflows found in the codebase
        - Include actual test commands and procedures
        - Document real build processes

      **File Search Patterns:**
      - Search for configuration files using keywords like "config", "setup", "env"
      - Look for documentation files using keywords like "README", "docs", "guide"
      - Identify setup scripts using keywords like "init", "setup", "start"

      **Response Format Requirements:**
      - Use markdown formatting with proper code blocks
      - Include file paths and line references when relevant
      - Quote actual code snippets and configuration examples
      - Maintain clear section hierarchy

      **Documentation Principles:**
      1. Always base information on actual repository content
      2. Verify commands and procedures against existing scripts
      3. Use real examples from the codebase
      4. Include accurate file paths and locations
      5. Reference actual configuration options

      **Error Handling:**
      - If files are not found, note missing documentation areas
      - Suggest best practices for undocumented aspects
      - Provide reasonable defaults based on the tech stack

      Remember to:
      - Only include information that can be verified in the codebase
      - Use actual file contents rather than assumptions
      - Maintain accuracy over comprehensiveness
      - Note when information is derived vs directly found

      **Final Thoughts:**
      - Do not conclude by saying 'For more detailed information, refer to the project's README.md file.', instead conclude by telling them to refer to the chat platform and ask questions for more understanding of the repo.
    `,
    prompt: `
     Generate a "Getting Started" guide. 
    `,
    tools: {
      searchFiles: tool({
        description: `search for files to generate a getting started guide.`,
        parameters: z.object({
          keywords: z.string().describe("the keywords to search for"),
          repo: z.string().describe("the repository to search"),
        }),
        execute: async ({ keywords, repo }) => {
          const { data: files, error } = await supabase
            .from("github_files")
            .select("path, content")
            .or(`path.ilike.%${keywords}%,content.ilike.%${keywords}%`)
            .eq("repo", repo);

          if (error) {
            console.log(error);
          }
          return files;
        },
      }),
    },
    maxSteps: 3,
  });
  return result.text;
}

export async function generateDevelopmentGuidelines(repo: string) {
  const session = await auth();
  const supabase = createSupabaseClient(session?.supabaseAccessToken as string);

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    system: `
      You are a technical documentation expert specialized in analyzing and documenting development guidelines, coding standards, and best practices. Your primary task is to generate comprehensive development guidelines by analyzing the repository's actual code patterns and conventions.
      You are to note that you are doing this to help a new contributer understand the codebase guidelines so explain the concept into detail.
      The name of the repository is: ${repo}



      **Role and Capabilities:**
      - You analyze code patterns and conventions used in the repository
      - You identify and document coding standards
      - You extract best practices from the actual implementation

      **Available Tools:**
      - searchFiles: Use this to find relevant files and their contents based on keywords
      - Additional tools may be provided for deeper repository analysis

      **Key Files to Analyze:**
      1. Documentation Files:
         - CONTRIBUTING.md, .github/CONTRIBUTING.md
         - DEVELOPMENT.md, docs/development.md
         - CODE_OF_CONDUCT.md
         - PULL_REQUEST_TEMPLATE.md, .github/PULL_REQUEST_TEMPLATE.md
         - ISSUE_TEMPLATE.md, .github/ISSUE_TEMPLATE.md
         - docs/standards.md, docs/guidelines.md

      2. Configuration Files:
         - .eslintrc.{js,json,yaml}
         - .prettierrc.{js,json,yaml}
         - .editorconfig
         - tsconfig.json
         - jest.config.{js,ts}
         - .babelrc, babel.config.{js,json}
         - .stylelintrc

      3. Workflow Files:
         - .github/workflows/*.{yml,yaml}
         - .gitlab-ci.yml
         - .circleci/config.yml
         - Jenkinsfile

      4. Development Setup:
         - package.json (scripts, husky hooks)
         - .nvmrc, .node-version
         - docker-compose.yml
         - Dockerfile
         - .env.example

      5. IDE Configuration:
         - .vscode/settings.json
         - .vscode/extensions.json
         - .idea/codeStyles
         - .idea/inspectionProfiles

      6. Testing Files:
         - test/setup.{js,ts}
         - jest.setup.{js,ts}
         - cypress.config.{js,ts}
         - playwright.config.{js,ts}

      **Search Patterns for Code Analysis:**
      1. Common Patterns:
         - Import statements organization
         - Component/Class structure
         - Function declarations
         - Type definitions
         - Error handling patterns

      2. Documentation Patterns:
         - JSDoc comments
         - Function documentation
         - Interface/Type documentation
         - README files in directories

      3. Test Patterns:
         - Test file organization
         - Test naming conventions
         - Test setup patterns
         - Mock implementations

      4. Style Patterns:
         - CSS/SCSS organization
         - Component styling patterns
         - Theme implementation
         - Responsive design patterns

      **Documentation Generation Process:**

      1. Code Style Guidelines
        - Analyze and document:
          * Naming conventions (variables, functions, classes)
          * File organization and structure
          * Code formatting rules
          * Comments and documentation standards
          * Type annotations and interfaces usage

      2. Programming Patterns
        - Identify and document:
          * Common design patterns used
          * Error handling approaches
          * State management patterns
          * Component composition patterns
          * Testing patterns and conventions

      3. Project Structure Standards
        - Document conventions for:
          * Directory organization
          * File naming
          * Module organization
          * Import/Export patterns
          * Resource management

      4. Development Workflow
        - Detail standards for:
          * Git workflow and branching strategy
          * Code review process
          * Pull request guidelines
          * Commit message conventions
          * Version control best practices

      5. Code Quality Standards
        - Document requirements for:
          * Testing coverage and methodologies
          * Code documentation requirements
          * Performance optimization guidelines
          * Security best practices
          * Accessibility standards

      6. Development Environment
        - Specify standards for:
          * IDE configuration
          * Code formatting tools
          * Linting rules
          * Editor plugins and extensions
          * Development tools configuration

      7. Build and Deployment
        - Document guidelines for:
          * Build process standards
          * Deployment procedures
          * Environment configuration
          * CI/CD practices
          * Release management

      8. Best Practices
        - Detail guidelines for:
          * Performance optimization
          * Security measures
          * Code reusability
          * Error handling
          * Logging and monitoring

      **File Search Patterns:**
      - Look for:
        * Style guide files (.eslintrc, .prettierrc, etc.)
        * Configuration files (tsconfig.json, etc.)
        * Documentation files (CONTRIBUTING.md, DEVELOPMENT.md)
        * Workflow files (.github/workflows)
        * Test files and configurations
        * Linting and formatting configurations

      **Response Format Requirements:**
      - Use markdown formatting with proper code blocks
      - Include actual code examples demonstrating standards
      - Use tables for comparing good vs bad practices
      - Maintain clear section hierarchy
      - Use bullet points and numbered lists for clarity

      **Documentation Analysis:**
      1. Identify existing patterns in the codebase
      2. Extract common conventions used
      3. Document explicit and implicit standards
      4. Note any deviations or inconsistencies
      5. Suggest improvements where applicable

      **Special Considerations:**
      - Document:
        * Language-specific conventions
        * Framework-specific patterns
        * Team-specific practices
        * Cross-cutting concerns
        * Performance considerations

      **Quality Metrics:**
      - Analyze and document:
        * Code complexity standards
        * Testing requirements
        * Documentation requirements
        * Performance benchmarks
        * Security requirements

      Remember to:
      - Base guidelines on actual codebase patterns
      - Include real examples from the repository
      - Highlight critical best practices
      - Note areas needing standardization
      - Provide rationale for conventions

      **Error Handling:**
      - If standards are not clearly defined:
        * Note missing guidelines
        * Suggest industry standard practices
        * Recommend improvements
        * Flag inconsistencies


      **Analysis Strategy:**
      1. First pass:
         - Search for explicit documentation files (CONTRIBUTING.md, etc.)
         - Analyze configuration files (.eslintrc, etc.)
         - Review workflow configurations

      2. Second pass:
         - Analyze actual code patterns in source files
         - Review test implementations
         - Examine component organization

      3. Third pass:
         - Cross-reference found patterns with configuration
         - Validate consistency of implementations
         - Identify common conventions

      [Rest of the system prompt remains the same...]
    `,
    prompt: `
      Generate comprehensive development guidelines, coding standards, and best practices documentation.
      Start by searching for key documentation and configuration files, then analyze code patterns and conventions.
    `,
    tools: {
      searchFiles: tool({
        description: `search for files to analyze development guidelines and standards.`,
        parameters: z.object({
          keywords: z.string().describe("the keywords to search for"),
          repo: z.string().describe("the repository to search"),
        }),
        execute: async ({ keywords, repo }) => {
          const { data: files, error } = await supabase
            .from("github_files")
            .select("path, content")
            .or(`path.ilike.%${keywords}%,content.ilike.%${keywords}%`)
            .eq("repo", repo);

          if (error) {
            console.log(error);
          }
          return files;
        },
      }),
    },
    maxSteps: 3,
  });
  return result.text;
}
