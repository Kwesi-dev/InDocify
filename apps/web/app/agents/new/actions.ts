"use server";

import { Project } from "ts-morph";
import { parse } from "python-ast";
import { generateText, tool } from "ai";
import { openai } from "@ai-sdk/openai";
import JSZip from "jszip";
import { auth } from "@/auth";
import { EXCLUDED_FILES } from "@/utils/data";
import { z } from "zod";
import { createSupabaseClient } from "@/lib/supabaseClient";

// Full Workflow

// Fetch files with content.

// Detect tech stack.

// Analyze code based on the detected language.

// Pass the analysis results to the AI for documentation generation.

// repoFetcher.ts

const frameworkRegistry = [
  {
    name: "React",
    dependencies: ["react", "react-dom"],
  },
  {
    name: "Next.js",
    dependencies: ["next"],
  },
  {
    name: "Remix",
    dependencies: ["@remix-run/react"],
  },
  {
    name: "Gatsby",
    dependencies: ["gatsby"],
  },
  {
    name: "Vue",
    dependencies: ["vue"],
  },
  {
    name: "Angular",
    dependencies: ["@angular/core"],
  },
  {
    name: "Svelte",
    dependencies: ["svelte"],
  },
];

const toolRegistry = [
  {
    name: "Vite",
    dependencies: ["vite"],
  },
  {
    name: "Create React App",
    dependencies: ["react-scripts"],
  },
  {
    name: "Tailwind CSS",
    dependencies: ["tailwindcss"],
  },
  {
    name: "ESLint",
    dependencies: ["eslint"],
  },
  {
    name: "Prettier",
    dependencies: ["prettier"],
  },
  {
    name: "TypeScript",
    dependencies: ["typescript"],
  },
];

const uiLibraryRegistry = [
  {
    name: "Material-UI (MUI)",
    dependencies: ["@mui/material"],
  },
  {
    name: "Chakra UI",
    dependencies: ["@chakra-ui/react"],
  },
  {
    name: "Ant Design",
    dependencies: ["antd"],
  },
  {
    name: "Tailwind CSS",
    dependencies: ["tailwindcss"],
  },
  {
    name: "Bootstrap",
    dependencies: ["bootstrap"],
  },
  {
    name: "Styled Components",
    dependencies: ["styled-components"],
  },
  {
    name: "Emotion",
    dependencies: ["@emotion/react", "@emotion/styled"],
  },
  {
    name: "Radix UI",
    dependencies: ["@radix-ui/react"],
  },
  {
    name: "Shadcn UI",
    dependencies: ["shadcn-ui"],
  },
];

/**
 * Fetches the files of a GitHub repository.
 * @param owner The GitHub owner of the repository.
 * @param repo The name of the repository.
 * @param accessToken The GitHub access token.
 * @returns An array of file objects with their paths and contents.
 */
const PRIORITY_FILES = [
  "README.md",
  "README.txt",
  "README",
  "CONTRIBUTING.md",
  "CHANGELOG.md",
  "LICENSE",
]; // Common README file names

// function shouldExcludeFile(path: string): boolean {
//   const excludedPatterns = EXCLUDED_FILES.map((pattern) => {
//     if (pattern.startsWith("*")) {
//       // Handle wildcard patterns (e.g., *.png)
//       return path.endsWith(pattern.slice(1));
//     }
//     return path.includes(pattern);
//   });
//   return excludedPatterns.some((matches) => matches);
// }

async function fetchRepoZip(owner: string, repo: string) {
  const session = await auth();
  const accessToken = session?.githubAccessToken || process.env.GITHUB_API_KEY;
  const zipUrl = `https://github.com/${owner}/${repo}/archive/main.zip`;
  const response = await fetch(zipUrl, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "User-Agent": "InDocify",
    },
  });
  console.log("response", response.arrayBuffer);
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

// export async function fetchRepoFiles(owner: string, repo: string) {
//   console.log("Fetching files for", owner, repo);
//   const session = await auth();
//   const accessToken = session?.githubAccessToken || process.env.GITHUB_API_KEY;
//   // Step 1: Fetch file tree (metadata)
//   const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`;
//   const headers = { Authorization: `Bearer ${accessToken}` };
//   const treeResponse = await fetch(treeUrl, { headers });

//   if (!treeResponse.ok) {
//     throw new Error(
//       `Failed to fetch repository tree: ${treeResponse.statusText}`
//     );
//   }

//   const treeData = await treeResponse.json();

//   console.log("treeData", treeData, treeData?.tree?.size);

//   // Step 2: Find the README file
//   const readmeFile = treeData.tree?.find((file: any) =>
//     PRIORITY_FILES?.some((pattern) => file?.path?.endsWith(pattern))
//   );

//   // Step 3: Filter other files
//   const otherFiles = treeData.tree.filter(
//     (file: any) =>
//       file?.type === "blob" && // Only files, not directories
//       !shouldExcludeFile(file.path) && // Exclude unnecessary files
//       !PRIORITY_FILES?.some((pattern) => file?.path.endsWith(pattern)) // Exclude README (already handled)
//   );

//   // //Step 4: Fetch file contents
//   // const filesWithContent = await Promise.all(
//   //   [readmeFile, ...otherFiles]
//   //     .filter(Boolean) // Remove null/undefined (if README not found)
//   //     .map(async (file: any) => {
//   //       const contentResponse = await fetch(file.url, { headers });
//   //       const contentData = await contentResponse.json();
//   //       console.log("contentData", contentData);
//   //       return {
//   //         path: file?.path,
//   //         content: Buffer?.from(contentData?.content, "base64")?.toString(
//   //           "utf-8"
//   //         ), // Decode Base64
//   //       };
//   //     })
//   // );

//   const totalFiles = treeData.tree?.filter(
//     (item: any) => item?.type === "blob"
//   ).length;

//   return { readmeFile, otherFiles, totalFiles };
// }

/**
 * Detects the tech stack of a given set of files.
 *
 * @param files An array of file objects with their paths and contents
 * @returns The detected tech stack
 */
// export async function detectTechStack(
//   files: Array<{ path: string; content: string }>
// ) {
//   const techStack = {
//     language: "unknown",
//     frameworks: [] as string[],
//     tools: [] as string[],
//     uiLibraries: [] as string[],
//   };

//   // Find package.json
//   const packageJsonFile = files.find((file) => file.path === "package.json");
//   if (!packageJsonFile) return techStack;

//   const packageJson = JSON.parse(packageJsonFile.content);
//   const allDependencies = {
//     ...packageJson.dependencies,
//     ...packageJson.devDependencies,
//   };

//   // Detect language
//   if (allDependencies.typescript) {
//     techStack.language = "TypeScript";
//   } else {
//     techStack.language = "JavaScript";
//   }

//   // Detect frameworks
//   frameworkRegistry.forEach((framework) => {
//     if (framework.dependencies.some((dep) => allDependencies[dep])) {
//       techStack.frameworks.push(framework.name);
//     }
//   });

//   // Detect tools
//   toolRegistry.forEach((tool) => {
//     if (tool.dependencies.some((dep) => allDependencies[dep])) {
//       techStack.tools.push(tool.name);
//     }
//   });

//   // Detect UI libraries
//   uiLibraryRegistry.forEach((library) => {
//     if (library.dependencies.some((dep) => allDependencies[dep])) {
//       techStack.uiLibraries.push(library.name);
//     }
//   });

//   return techStack;
// }

// export async function analyzeJS(files: { path: string; content: string }[]) {
//   const project = new Project({ useInMemoryFileSystem: true });
//   const analysisResults: Record<string, any> = {};

//   const readmeFile = files.find((file) => /^README(\..+)?$/i.test(file.path));

//   // Process all files
//   for (const file of files) {
//     const sourceFile = project.createSourceFile(file.path, file.content);

//     // Extract file metadata
//     const fileAnalysis = {
//       path: file.path,
//       functions: [] as Array<{ name: string; parameters: string[] }>,
//       variables: [] as Array<{ name: string; type: string }>,
//       classes: [] as Array<{
//         name: string;
//         props: string[];
//         methods: string[];
//       }>,
//       exports: [] as string[],
//       imports: [] as string[],
//       content: file.content,
//     };

//     // Extract functions
//     sourceFile.getFunctions().forEach((func) => {
//       fileAnalysis.functions.push({
//         name: func.getName() as string,
//         parameters: func.getParameters().map((p) => p.getName()),
//       });
//     });

//     // Extract variables
//     sourceFile.getVariableDeclarations().forEach((variable) => {
//       fileAnalysis.variables.push({
//         name: variable.getName(),
//         type: variable.getType().getText(),
//       });
//     });

//     // Extract classes
//     sourceFile.getClasses().forEach((cls) => {
//       fileAnalysis.classes.push({
//         name: cls.getName() as string,
//         props: cls.getProperties().map((p) => p.getName()),
//         methods: cls.getMethods().map((m) => m.getName()),
//       });
//     });

//     // Extract exports
//     sourceFile.getExportDeclarations().forEach((exportDecl) => {
//       exportDecl.getNamedExports().forEach((namedExport) => {
//         fileAnalysis.exports.push(namedExport.getName());
//       });
//     });

//     // Extract imports
//     sourceFile.getImportDeclarations().forEach((importDecl) => {
//       importDecl.getModuleSpecifier().getText(); // This will throw an error if the module cannot be resolved
//       fileAnalysis.imports.push(importDecl.getModuleSpecifier().getText());
//     });

//     // Add file analysis to results
//     analysisResults[file.path] = fileAnalysis;
//   }

//   return { analysisResults, readmeFile };
// }

// interface PythonFunction {
//   name: string;
//   args: string[];
//   doc?: string;
// }

// export async function analyzePython(
//   files: { path: string; content: string }[]
// ) {
//   const pythonFiles = files.filter((f) => f.path.endsWith(".py"));
//   const analysisResults: Array<{ path: string; functions: PythonFunction[] }> =
//     [];

//   const readmeFile = files.find((f) => f.path.endsWith("README.md"));

//   for (const file of pythonFiles) {
//     try {
//       const ast = parse(file.content);

//       // Type-cast the AST to access its properties
//       const functions = (ast as any).body
//         .filter((node: any) => node.type === "FunctionDef")
//         .map((node: any) => ({
//           name: node.name,
//           args: node.args.args.map((arg: any) => arg.arg),
//           doc: node.docstring?.value,
//         }));

//       analysisResults.push({ path: file.path, functions });
//     } catch (error) {
//       console.error(`Error parsing ${file.path}:`, error);
//     }
//   }

//   return { analysisResults, readmeFile };
// }

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

// export async function generateArchitectureDocs(repo: string) {
//   const session = await auth();
//   const supabase = createSupabaseClient(session?.supabaseAccessToken as string);

//   const result = await generateText({
//     model: openai("gpt-4-turbo"),
//     system: `
//       You are a technical documentation expert specialized in creating comprehensive architecture documentation by analyzing repository content through a database interface. Your primary task is to generate detailed architectural documentation using the repository's actual files and content.
//       The name of the repository is: ${repo}

//       **Role and Capabilities:**
//       - You analyze repository structure and content to document architectural decisions
//       - You map relationships between different components and services
//       - You focus on actual implementation patterns found in the codebase

//       **Available Tools:**
//       - searchFiles: Use this to find relevant files and their contents based on keywords
//       - Additional tools may be provided for deeper repository analysis

//       **Key Files to Analyze:**
//       1. Architecture Documentation:
//          - docs/architecture.md, ARCHITECTURE.md
//          - docs/design.md, DESIGN.md
//          - docs/system-design.md
//          - docs/high-level-design.md
//          - docs/technical-design.md
//          - docs/adr/* (Architecture Decision Records)
//          - wiki/architecture/*

//       2. Application Entry Points:
//          - src/index.{js,ts}
//          - src/main.{js,ts}
//          - src/app.{js,ts}
//          - pages/_app.{js,ts}
//          - app/layout.{js,ts}

//       3. Configuration Files:
//          - next.config.js
//          - vite.config.ts
//          - webpack.config.js
//          - tsconfig.json (module paths)
//          - package.json (dependencies)
//          - turbo.json (workspaces)
//          - nx.json (monorepo)

//       4. API Definitions:
//          - src/api/*
//          - pages/api/*
//          - app/api/*
//          - swagger.{json,yaml}
//          - openapi.{json,yaml}
//          - graphql.schema

//       5. Database Schema:
//          - prisma/schema.prisma
//          - migrations/*
//          - schema.sql
//          - models/*
//          - entities/*

//       6. Infrastructure Files:
//          - docker-compose.yml
//          - Dockerfile
//          - kubernetes/*
//          - terraform/*
//          - .env.example
//          - nginx.conf

//       **Search Patterns for Architecture Analysis:**
//       1. Component Organization:
//          - Component folder structure
//          - Module boundaries
//          - Service layers
//          - Feature organization
//          - Domain separation

//       2. Data Flow Patterns:
//          - API routes and handlers
//          - State management setup
//          - Database access patterns
//          - Service communication
//          - Event handling

//       3. Integration Patterns:
//          - External service integrations
//          - Authentication implementation
//          - API middleware
//          - Database connections
//          - Caching strategies

//       4. Infrastructure Patterns:
//          - Deployment configuration
//          - Service orchestration
//          - Environment setup
//          - Scaling provisions
//          - Monitoring setup

//       **Analysis Strategy:**
//       1. First Pass - High-Level Architecture:
//          - Identify main application components
//          - Map service boundaries
//          - Document data flow
//          - Understand deployment strategy

//       2. Second Pass - Implementation Details:
//          - Analyze component interactions
//          - Review state management
//          - Examine API structure
//          - Study database schema

//       3. Third Pass - Cross-Cutting Concerns:
//          - Security implementations
//          - Performance optimizations
//          - Scalability provisions
//          - Monitoring solutions

//       **Documentation Structure:**
//       1. System Overview
//          - High-level architecture diagram
//          - Key components and their purposes
//          - Technology stack overview
//          - System boundaries and interfaces

//       2. Component Architecture
//          - Detailed component breakdown
//          - Component relationships
//          - Data flow diagrams
//          - State management approach

//       3. Data Architecture
//          - Database schema overview
//          - Data models and relationships
//          - Caching strategy
//          - Data flow patterns

//       4. API Architecture
//          - API design patterns
//          - Endpoint organization
//          - Authentication/Authorization
//          - Integration patterns

//       5. Infrastructure Architecture
//          - Deployment architecture
//          - Scaling strategy
//          - Environment configuration
//          - DevOps practices

//       **Error Handling:**
//       - If architectural details are not explicit:
//          * Infer from code organization
//          * Note assumptions made
//          * Suggest architectural improvements
//          * Flag potential architectural debt

//       Remember to:
//       - Focus on actual implementation patterns
//       - Provide concrete examples from the codebase
//       - Highlight architectural decisions and their rationale
//       - Note scalability and performance considerations
//       - Document security measures and best practices

//       **Final Thoughts:**
//       - Do not conclude by referring to external documentation, instead encourage users to use the chat platform for clarification about the architecture.
//     `,
//     prompt: `
//       Generate a comprehensive architecture overview documentation.
//       Start by analyzing key architectural files and patterns, then document the system's structure and organization.
//     `,
//     tools: {
//       searchFiles: tool({
//         description: `search for files to analyze the project architecture.`,
//         parameters: z.object({
//           keywords: z.string().describe("the keywords to search for"),
//           repo: z.string().describe("the repository to search"),
//         }),
//         execute: async ({ keywords, repo }) => {
//           // Split the keywords into individual terms and clean them
//           const searchTerms = keywords
//             .split(/[,\s]+/)
//             .map((term) => term.trim())
//             .filter((term) => term.length > 0);

//           console.log("searchTerms", searchTerms);

//           // Create an array of promises for parallel execution
//           const searchPromises = searchTerms.map(async (term) => {
//             const { data, error } = await supabase
//               .from("github_files")
//               .select("path, content")
//               .or(`path.ilike.%${term}%,content.ilike.%${term}%`)
//               .eq("repo", repo);

//             if (error) {
//               console.log("Error searching for term:", term, error);
//               return [];
//             }
//             return data || [];
//           });

//           // Execute all searches in parallel and combine results
//           const results = await Promise.all(searchPromises);

//           // Flatten and deduplicate results based on file path
//           const uniqueFiles = new Map();
//           results.flat().forEach((file) => {
//             if (file && file.path) {
//               uniqueFiles.set(file.path, file);
//             }
//           });

//           return Array.from(uniqueFiles.values());
//         },
//       }),
//     },
//     maxSteps: 3,
//   });
//   return result.text;
// }

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
// import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
// import { generateEmbedding } from "@/lib/ai/embedding";
// import { auth } from "@/auth";
// import { createSupabaseClient } from "@/lib/supabaseClient";

// // For code files
// const codeSplitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 1000, // Number of characters per chunk
//   chunkOverlap: 200, // Overlap between chunks for context
//   separators: ["\n\n", "\n", " ", ""], // Split by newlines and spaces
// });
// // For text files
// const textSplitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 1000,
//   chunkOverlap: 200,
//   separators: ["\n\n", "\n", " ", ""],
// });

// /**
//  * Splits files into chunks based on their file type (code or text).
//  * @param files - An array of files to be split into chunks.
//  * @returns An array of chunks, where each chunk is an object containing the file path and the chunked content.
//  */
// export async function processEmbeddings(
//   files: { path: string; content: string }[],
//   repo: string
// ) {
//   const session = await auth();
//   const supabase = createSupabaseClient(session?.supabaseAccessToken as string);
//   const chunks = [];

//   // Step 1: Chunk files
//   for (const file of files) {
//     const splitter = file.path.endsWith(".md") ? textSplitter : codeSplitter;
//     const fileChunks = await splitter.createDocuments(
//       [file.content],
//       [{ path: file.path }]
//     );

//     chunks.push(
//       ...fileChunks.map((chunk) => ({
//         path: file.path,
//         content: chunk.pageContent,
//         metadata: chunk.metadata,
//       }))
//     );
//   }

//   // Step 2: Generate and save embeddings one at a time
//   for (const chunk of chunks) {
//     try {
//       // Generate embedding for the chunk
//       const { embedding, content } = await generateEmbedding(chunk);

//       // Save the chunk and its embedding to Supabase
//       const { error } = await supabase.from("repo_embeddings").insert({
//         repo,
//         file_path: chunk.path,
//         content,
//         embedding,
//       });

//       if (error) {
//         console.error(`Error storing embedding for ${chunk.path}:`, error);
//       } else {
//         console.log(`Successfully stored embedding for ${chunk.path}`);
//       }
//     } catch (error) {
//       console.error(`Error generating embedding for ${chunk.path}:`, error);
//     }
//   }

//   return chunks.length; // Return the number of chunks processed
// }
