"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { auth } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { decryptToken } from "@/utils";

const exemptedFiles = [
  // JavaScript/TypeScript lock files
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "bun.lockb",
  "components.json",
  // Python lock files and cache
  "poetry.lock",
  "Pipfile.lock",
  "requirements.txt.lock",
  "*.pyc",
  "*.pyo",
  "*.pyd",
  // Common files
  ".gitignore",
  ".env",
  ".env.*",
  ".DS_Store",
];

const exemptedDirs = [
  // JavaScript/TypeScript build and cache
  ".next",
  ".vercel",
  ".vercel_build_output",
  ".github",
  ".turbo",
  "public",
  "node_modules",
  "dist",
  "build",
  // Python specific
  "__pycache__",
  ".pytest_cache",
  ".mypy_cache",
  ".coverage",
  ".tox",
  ".venv",
  "venv",
  "env",
  "virtualenv",
  // Common
  "tests",
  "test",
  ".git",
  ".idea",
  ".vscode",
];

export const supabaseClient = async () => {
  const session = await auth();
  return createSupabaseClient(session?.supabaseAccessToken as string);
};

async function fetchFileContent(file: any, headers: HeadersInit) {
  const response = await fetch(file.url, { headers });
  const fileData = await response.json();

  if (fileData.encoding === "base64") {
    return { ...file, content: atob(fileData.content) };
  }
  return file;
}

// async function saveFilesToSupabase(files: Record<string, any[]>) {
//   const session = await auth();
//   const client = await supabaseClient();

//   const { data, error } = await client.from("github_files").upsert(
//     {
//       project_overview: files["Project Overview"],
//       github_access_token: session?.githubAccessToken as string,
//     },
//     {
//       onConflict: "github_access_token",
//     }
//   );
//   if (error) {
//     console.error("Error inserting files:", error);
//   } else {
//     console.log("Files inserted successfully:", data);
//   }
// }

export async function fetchGroupedFilesWithContent(
  owner: string,
  repo: string
) {
  const session = await auth();
  const encryptedToken = session?.githubAccessToken as string;
  const accessToken = encryptedToken
    ? decryptToken(encryptedToken)
    : process.env.GITHUB_API_KEY;

  const repoContentsUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;

  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };

  const groupedFiles: Record<string, any[]> = {
    "Project Overview": [],
    "Code Structure and Organization": [],
    "Setting Up the Development Environment": [],
    "Coding Best Practices or Guidelines": [],
    // Add other sections as needed
  };

  const sectionMapping: Record<string, string[]> = {
    "Project Overview": [
      "README.md",
      "package.json",
      "setup.py",
      "pyproject.toml",
      "LICENSE",
      "CHANGELOG.md",
      "CONTRIBUTING.md",
    ],
    "Code Structure and Organization": [
      // Source code directories
      "src/**/*",
      "lib/**/*",
      "app/**/*",
      "packages/**/*",
      "components/**/*",
      // Python-specific patterns
      "tests/**/*",
      "test/**/*",
      "__init__.py",
      "__main__.py",
      "setup.py",
      "pyproject.toml",
      // JavaScript/TypeScript patterns
      "tsconfig.json",
      "next.config.js",
      "vite.config.js",
      "webpack.config.js",
      "package.json",
      // Documentation
      "docs/**/*",
      "README.md",
      // API and database
      "api/**/*",
      "routes/**/*",
      "models/**/*",
      "schemas/**/*",
      "migrations/**/*",
      "database/**/*",
      // Configuration and utilities
      "config/**/*",
      "utils/**/*",
      "helpers/**/*",
      "scripts/**/*",
      // Assets and static files
      "assets/**/*",
      "static/**/*",
      "public/**/*",
      // Type definitions
      "types/**/*",
      "@types/**/*",
      "interfaces/**/*",
    ],
    "Setting Up the Development Environment": [
      // JavaScript/TypeScript files
      "package.json",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      ".env.example",
      "tsconfig.json",
      "next.config.js",
      "vite.config.js",
      "webpack.config.js",
      // Python files
      "requirements.txt",
      "Pipfile",
      "Pipfile.lock",
      "poetry.lock",
      "pyproject.toml",
      "setup.py",
      "setup.cfg",
      "tox.ini",
      "pytest.ini",
      // Common files
      "README.md",
      "CONTRIBUTING.md",
      "Dockerfile",
      "docker-compose.yml",
    ],
    "Coding Best Practices or Guidelines": [
      // JavaScript/TypeScript files
      ".eslintrc.js",
      ".eslintrc.json",
      ".prettierrc",
      ".prettierrc.json",
      ".prettierrc.js",
      // Python files
      ".pylintrc",
      "mypy.ini",
      "setup.cfg",
      "pytest.ini",
      "black.toml",
      "flake8",
      "isort.cfg",
      // Common files
      ".editorconfig",
      "CONTRIBUTING.md",
      "jest.config.js",
      "vitest.config.js",
      "commitlint.config.js",
      "husky.config.js",
    ],
  };

  async function traverse(url: string) {
    const response = await fetch(url, { headers });
    const items = await response.json();

    if (items?.message === "This repository is empty.") {
      return;
    }

    const filePromises = items.map(async (item: any) => {
      if (exemptedFiles.includes(item.name)) {
        return;
      }

      for (const [section, fileNames] of Object.entries(sectionMapping)) {
        if (
          section === "Project Overview" ||
          section === "Setting Up the Development Environment" ||
          section === "Coding Best Practices or Guidelines"
        ) {
          if (item.type === "file" && fileNames.includes(item.name)) {
            const fileContent = await fetchFileContent(item, headers);
            if (groupedFiles[section]) {
              groupedFiles[section].push(fileContent);
            }
          } else if (item.type === "dir" && !exemptedDirs.includes(item.name)) {
            await traverse(item.url);
          }
        } else if (section === "Code Structure and Organization") {
          //return the folders names and the names of the files in that folder
          if (groupedFiles[section]) {
            if (item.type === "file") {
              groupedFiles[section].push({
                name: item.name,
                path: item.path,
                type: item.type,
              });
            } else if (
              item.type === "dir" &&
              !exemptedDirs.includes(item.name)
            ) {
              groupedFiles[section].push({
                name: item.name,
                path: item.path,
                type: item.type,
              });
              await traverse(item.url);
            }
          }
        }
      }
    });

    // Process files and directories concurrently
    await Promise.all(filePromises);
  }

  await traverse(repoContentsUrl);

  return groupedFiles;
}

function analyzeTechStack(files: Record<string, any>[]) {
  const techStack = {
    languages: new Set<string>(),
    frameworks: new Set<string>(),
    buildTools: new Set<string>(),
    packageManagers: new Set<string>(),
    testing: new Set<string>(),
    database: new Set<string>(),
    deployment: new Set<string>(),
  };

  // Helper function to check file existence
  const hasFile = (pattern: string) => {
    return files.some((file) => {
      const name = file.name || "";
      const path = file.path || "";
      const content = file.content || "";
      return (
        name.match(new RegExp(pattern, "i")) ||
        path.match(new RegExp(pattern, "i")) ||
        content.match(new RegExp(pattern, "i"))
      );
    });
  };

  // Helper function to check content
  const hasContent = (pattern: string) => {
    return files.some((file) => {
      const content = file.content || "";
      return content.match(new RegExp(pattern, "i"));
    });
  };

  // Check for Python
  if (
    hasFile("requirements.txt") ||
    hasFile("setup.py") ||
    hasFile("pyproject.toml") ||
    hasFile("\\.py$")
  ) {
    techStack.languages.add("Python");

    // Python specific frameworks
    if (hasContent("django")) techStack.frameworks.add("Django");
    if (hasContent("flask")) techStack.frameworks.add("Flask");
    if (hasContent("fastapi")) techStack.frameworks.add("FastAPI");

    // Python package managers
    if (hasFile("requirements.txt")) techStack.packageManagers.add("pip");
    if (hasFile("Pipfile")) techStack.packageManagers.add("pipenv");
    if (hasFile("poetry.lock")) techStack.packageManagers.add("poetry");

    // Python testing
    if (hasContent("pytest")) techStack.testing.add("pytest");
    if (hasContent("unittest")) techStack.testing.add("unittest");

    // Python build tools
    if (hasFile("setup.py")) techStack.buildTools.add("setuptools");
    if (hasFile("pyproject.toml")) techStack.buildTools.add("poetry");
  }

  // Check for JavaScript/TypeScript
  if (hasFile("\\.js$") || hasFile("\\.jsx$"))
    techStack.languages.add("JavaScript");
  if (hasFile("\\.ts$") || hasFile("\\.tsx$"))
    techStack.languages.add("TypeScript");

  if (
    techStack.languages.has("JavaScript") ||
    techStack.languages.has("TypeScript")
  ) {
    // JS/TS Frameworks
    if (hasFile("next.config")) techStack.frameworks.add("Next.js");
    if (hasContent("react")) techStack.frameworks.add("React");
    if (hasContent("vue")) techStack.frameworks.add("Vue");
    if (hasContent("angular")) techStack.frameworks.add("Angular");

    // Package managers
    if (hasFile("package-lock.json")) techStack.packageManagers.add("npm");
    if (hasFile("yarn.lock")) techStack.packageManagers.add("yarn");
    if (hasFile("pnpm-lock.yaml")) techStack.packageManagers.add("pnpm");

    // Build tools
    if (hasFile("webpack")) techStack.buildTools.add("webpack");
    if (hasFile("vite")) techStack.buildTools.add("vite");
    if (hasFile("rollup")) techStack.buildTools.add("rollup");
    if (hasFile("tsconfig")) techStack.buildTools.add("TypeScript");

    // Testing
    if (hasContent("jest")) techStack.testing.add("Jest");
    if (hasContent("vitest")) techStack.testing.add("Vitest");
    if (hasContent("cypress")) techStack.testing.add("Cypress");
  }

  // Database
  if (hasContent("prisma")) techStack.database.add("Prisma");
  if (hasContent("sequelize")) techStack.database.add("Sequelize");
  if (hasContent("mongoose")) techStack.database.add("MongoDB");
  if (hasContent("typeorm")) techStack.database.add("TypeORM");
  if (hasContent("sqlalchemy")) techStack.database.add("SQLAlchemy");
  if (hasContent("django.*models")) techStack.database.add("Django ORM");

  // Deployment
  if (hasFile("dockerfile")) techStack.deployment.add("Docker");
  if (hasFile("kubernetes")) techStack.deployment.add("Kubernetes");
  if (hasFile("vercel.json")) techStack.deployment.add("Vercel");
  if (hasFile("netlify.toml")) techStack.deployment.add("Netlify");
  if (hasFile("railway.toml")) techStack.deployment.add("Railway");
  if (hasFile("fly.toml")) techStack.deployment.add("Fly.io");

  return {
    languages: Array.from(techStack.languages),
    frameworks: Array.from(techStack.frameworks),
    buildTools: Array.from(techStack.buildTools),
    packageManagers: Array.from(techStack.packageManagers),
    testing: Array.from(techStack.testing),
    database: Array.from(techStack.database),
    deployment: Array.from(techStack.deployment),
  };
}

export const generateProjectOverviewDocs = async (
  files: Record<string, any>[],
  clone_url: string
) => {
  // Analyze the tech stack first
  const techStack = analyzeTechStack(files);
  console.log("techStack", techStack);

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
        Clone url: ${clone_url}
        
        Based on the analysis of the repository files, here is the detected technology stack:
        ${JSON.stringify(techStack, null, 2)}
        
        Please generate documentation based ONLY on the detected technologies and files present in the repository.
        Do not make assumptions about technologies that are not evidenced in the files.
      `,
    system: `
            You are a documentation assistant tasked with generating a **Project Overview** section for a software project.
            You must ONLY describe technologies and patterns that are actually present in the repository files.
            Never make assumptions about technologies that aren't evidenced in the file list or tech stack analysis.
            
            Content Guidelines:
            1. Project Introduction
               • Provide a clear, concise description of the project's purpose
               • Identify the primary programming languages (Python, JavaScript/TypeScript, etc.)
               • List key frameworks and technologies used
               • Explain the project's core features and capabilities

            2. Technical Stack Overview
               • Backend technologies (Python frameworks, Node.js, etc.)
               • Frontend frameworks (React, Vue, Angular, etc.)
               • Database systems
               • Key dependencies and libraries
               • Build tools and package managers (npm, pip, poetry, etc.)

            3. Architecture Overview
               • High-level system architecture
               • Key components and their interactions
               • Data flow between components
               • External service integrations

            4. Getting Started
               • Prerequisites (language versions, tools, etc.)
               • Quick start guide
               • Development environment setup overview
               • Basic usage examples

            5. Key Features
               • Core functionality
               • Notable implementations
               • Unique selling points
               • Integration capabilities

            6. Project Status
               • Current development stage
               • Versioning information
               • Roadmap highlights
               • Known limitations

            Style Guidelines:
            • Write in clear, professional language
            • Use consistent terminology
            • Include relevant code examples when helpful
            • Link to detailed documentation where appropriate
            • Highlight language-specific considerations
            • Include diagrams or visual aids when beneficial

    `,
  });

  return result.text;
};

export const generateCodeStructureDocs = async (
  files: Record<string, any>[]
) => {
  // Analyze the tech stack first
  const techStack = analyzeTechStack(files);

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
        
        Based on the analysis of the repository files, here is the detected technology stack:
        ${JSON.stringify(techStack, null, 2)}
        
        Please generate documentation based ONLY on the detected technologies and files present in the repository.
        Do not make assumptions about technologies that are not evidenced in the files.
      `,
    system: `
          You are a documentation assistant tasked with generating a **Code Structure and Organization** section for a software project.
          Your goal is to generate documentation which explains the architecture, file organization, and key configurations of the codebase so that the new developer understands the project structure and how to navigate it.

          Content Guidelines:
          1. Directory Structure
             • Root-level organization
             • Key directories and their purposes
             • Language-specific directories (Python packages, JavaScript/TypeScript modules)
             • Test organization
             • Resource locations (assets, static files, templates)

          2. Code Organization
             • Module/Package structure
             • Component organization
             • Naming conventions
             • File grouping strategies
             • Language-specific patterns (Python packages, JS/TS modules)

          3. Architecture Patterns
             • Design patterns used
             • Code layering (MVC, MVVM, etc.)
             • Service organization
             • Data flow patterns
             • State management

          4. Key Components
             • Core modules/packages
             • Important classes/functions
             • API structure
             • Database schema organization
             • Utility functions location

          5. Configuration
             • Environment configurations
             • Build configurations
             • Language-specific settings (pyproject.toml, tsconfig.json, etc.)
             • Dependencies management
             • Development tools setup

          6. Best Practices Implementation
             • Code organization standards
             • File naming conventions
             • Module organization patterns
             • Import structure
             • Type organization (for TypeScript/Python type hints)

          Style Guidelines:
             • Use clear headings and subheadings
             • Include relevant file tree diagrams
             • Provide examples of key file locations
             • Explain language-specific conventions
             • Link related documentation sections
             • Include rationale for structural decisions

    `,
  });

  return result.text;
};

export const generateProjectSetupDocs = async (
  files: Record<string, any>[],
  clone_url: string
) => {
  // Analyze the tech stack first
  const techStack = analyzeTechStack(files);

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
        Clone url: ${clone_url}
        
        Based on the analysis of the repository files, here is the detected technology stack:
        ${JSON.stringify(techStack, null, 2)}
        
        Please generate documentation based ONLY on the detected technologies and files present in the repository.
        Do not make assumptions about technologies that are not evidenced in the files.
      `,
    system: `
          You are a documentation assistant tasked with generating a **Setting Up the Development Environment** section for a software project.
          Your goal is to generate documentation which lists the tools, technologies, and configurations needed to set up the development environment.
          You can include links to the documentation of the tools if necessary.
          You should take note of the package manager used in the project based on the files provided.

          Content Guidelines:
          1. Prerequisites
             • Required language versions (Python, Node.js, etc.)
             • Development tools and IDEs
             • System requirements
             • Required global packages

          2. Installation Steps
             • Repository setup
             • Language-specific setup (Python virtualenv, Node.js version)
             • Package manager installation (npm, pip, poetry, etc.)
             • Development dependencies
             • Environment variables

          3. Configuration
             • Environment setup (.env files)
             • IDE configuration
             • Build tool setup
             • Test framework configuration
             • Linter and formatter setup

          4. Build Process
             • Development build steps
             • Production build process
             • Asset compilation
             • Type generation
             • Database setup

          5. Running the Application
             • Development server
             • Test execution
             • Debug configuration
             • Common commands
             • Docker setup (if applicable)

          6. Common Issues
             • Known setup problems
             • Troubleshooting guides
             • Platform-specific issues
             • Dependency conflicts
             • Environment problems

          Style Guidelines:
             • Provide step-by-step instructions
             • Include command examples
             • Note platform differences (Windows/Mac/Linux)
             • Explain configuration options
             • Include verification steps
             • Reference official documentation
      

    `,
  });

  return result.text;
};

export const generateBestPracticesDocs = async (
  files: Record<string, any>[]
) => {
  // Analyze the tech stack first
  const techStack = analyzeTechStack(files);

  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
        
        Based on the analysis of the repository files, here is the detected technology stack:
        ${JSON.stringify(techStack, null, 2)}
        
        Please generate documentation based ONLY on the detected technologies and files present in the repository.
        Do not make assumptions about technologies that are not evidenced in the files.
      `,
    system: `
          You are a documentation assistant tasked with generating a **Coding Best Practices or Guidelines** section for a software project. Your goal is to help new developers understand the project's coding conventions, folder structures, naming conventions, and standards, ensuring consistency across the team.

          Content Guidelines:
          1. Code Style
             • Language-specific style guides (PEP 8, JavaScript Standard)
             • Formatting conventions
             • Naming conventions
             • Documentation standards
             • Type annotations usage

          2. Architecture Guidelines
             • Module organization
             • Component structure
             • Design patterns
             • State management
             • Error handling

          3. Testing Standards
             • Test organization
             • Testing frameworks
             • Coverage requirements
             • Mocking practices
             • Integration tests

          4. Version Control
             • Branch naming
             • Commit messages
             • PR/MR process
             • Code review guidelines
             • Release process

          5. Performance Considerations
             • Optimization guidelines
             • Resource management
             • Caching strategies
             • Memory management
             • Async patterns

          6. Security Best Practices
             • Authentication handling
             • Data validation
             • API security
             • Environment variables
             • Dependency management

          7. Documentation Requirements
             • Code comments
             • API documentation
             • README standards
             • Change documentation
             • Type definitions

          Style Guidelines:
             • Use clear examples
             • Explain rationale behind practices
             • Include anti-patterns to avoid
             • Reference language-specific tools
             • Link to official style guides
             • Include code snippets
          `,
  });

  return result.text;
};
