"use server";

import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { auth } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";

const exemptedfiles = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "pnpm-workspace.yaml",
  "bun.lockb",
  "components.json",
  ".gitignore",
];

const exemptedDirs = [
  ".next",
  ".vercel",
  ".vercel_build_output",
  ".github",
  ".turbo",
  "public",
  "node_modules",
  "dist",
  "tests",
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
  const accessToken = session?.githubAccessToken as string;

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
      "LICENSE",
      "CHANGELOG.md",
      "CONTRIBUTING.md",
    ],
    "Code Structure and Organization": [],
    "Setting Up the Development Environment": [
      "package.json",
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      ".env.example",
      "tsconfig.json",
      "next.config.js",
      "vite.config.js",
      "webpack.config.js",
      "README.md",
      "CONTRIBUTING.md",
      "Dockerfile",
      "docker-compose.yml",
    ],
    "Coding Best Practices or Guidelines": [
      ".eslintrc.js",
      ".eslintrc.json",
      ".prettierrc",
      ".prettierrc.json",
      ".prettierrc.js",
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
      if (exemptedfiles.includes(item.name)) {
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

const mdxGuidelines = `
    ## MDX Guidelines

    ### General Markdown Syntax
    Use Markdown for basic content formatting. Examples include headings, lists, emphasis, tables, and images.

    **Examples**:
    - **Headings**:
    -markdown:
    # Main Heading
    ## Subheading
    ### Sub-Subheading

    Text in **bold**.
    Text in _italics_.
    Text in ~~strikethrough~~.

    Lists:
        - Item 1
        - Item 2

        1. Ordered List
        2. Ordered List

    Quotes:
    > This is a quote.

    Tables:
    | Column 1 | Column 2 |
    | -------- | -------- |
    | Value 1  | Value 2  |
    | Value 3  | Value 4  |

    Images:
    ![Alt Text](image.png)

    **Code Blocks**:
    - Use three backticks for code blocks.


    ### MDX Syntax
    Include frontmatter for document metadata. Place it at the top of the document.

    **Examples**:
    - **Frontmatter**:
    ---
    title: "My Document"
    description: "This is a description of the document."
    ---            

    Custom Anchor Links:
    Use the {#anchor} syntax to create anchor links within the document.

    **Examples**:
    - **Anchor Link**:
    # Main Heading {#main-heading}

    Auto Links:
    Internal Links:
    [Internal Link](/internal-link)

    External Links:
    [External Link](https://example.com)
    
    Tabs for Codeblocks:
    import { Tab, Tabs } from 'fumadocs-ui/components/tabs';

        <Tabs items={["Tab 1", "Tab 2"]}>
        
        [three backticks]
        console.log('A');
        [/three backticks]
        
        
        [three backticks] ts tab
        console.log('B');
        [/three backticks]
        
        
        </Tabs>

    Highlighted Codeblocks:
    [three backticks]tsx
    console.log('A');
    [/three backticks]
`;

export const generateProjectOverviewDocs = async (
  files: Record<string, any>[],
  clone_url: string
) => {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
        Clone url: ${clone_url}
      `,
    system: `
            You are an expert MDX documentation generator for InDocify, a platform that creates structured, high-quality documentation to simplify developer onboarding. Your current task is to generate the **Project Overview: High-Level Understanding** section of the documentation. Follow the detailed formatting and behavior guidelines below.
            You are to assume that you are the senior developer or lead developer trying to explain the project to a newly hired developer.
           
            ### **MDX Structure**

            1. **Frontmatter**  
            Every document must begin with a YAML-style frontmatter section containing the title and description. This identifies the section for readers.

            Example:  
            ---
            title: "Project Overview"
            description: "Overview of the project's purpose, features, and architecture to onboard developers."
            ---


            2.	Content Guidelines
                •	Use headings and subheadings to clearly separate key aspects of the project.
                •	Summarize the project’s purpose, core features, architecture, and technology stack in a concise, developer-friendly format.
                •	For each subheading, include detailed explanations that would eliminate the need for repetitive onboarding meetings.

            
            
            Essential Files for High-Level Documentation
            1.	README.md
            •	Purpose: Serves as the project’s introductory documentation.
            •	Includes:
            •	Overview of the project.
            •	Quick start guide.
            •	High-level purpose and goals.
            •	Why: A well-maintained README.md typically contains essential context for the project.
            2.	package.json
            •	Purpose: Provides insights into the project dependencies, scripts, and metadata.
            •	Includes:
            •	Project name, version, and description.
            •	Scripts for running, building, or testing.
            •	Dependency list.
            •	Why: Helps new developers understand the libraries, frameworks, and tools used.
            3.	LICENSE (optional but recommended)
            •	Purpose: Specifies the legal terms for using, sharing, or modifying the project.
            •	Why: Critical for understanding the usage rights and limitations.
            4.	.gitignore
            •	Purpose: Lists files and directories ignored by Git.
            •	Why: Helps clarify which files are excluded from version control and why.
            5.	tsconfig.json / jsconfig.json
            •	Purpose: Configures TypeScript or JavaScript settings.
            •	Why: Important for understanding how the code is structured and typed.
            6.	next.config.js (for Next.js projects)
            •	Purpose: Contains project-specific configurations for routing, middleware, and optimizations.
            •	Why: Provides insights into server-side settings and environment setups.
            7.	Supabase schema file (if applicable)
            •	Purpose: Describes the database structure.
            •	Why: Useful for understanding data models and relationships.
            8.	CHANGELOG.md
            •	Purpose: Tracks project updates, fixes, and releases.
            •	Why: Helps developers understand the evolution of the project and identify recent changes.
            9.	CONTRIBUTING.md (optional)
            •	Purpose: Guides contributors on how to participate in the project.
            •	Why: Relevant for understanding collaboration workflows.
            10.	Architecture Diagrams or Notes (e.g., /docs/architecture.md)
            •	Purpose: Provides an overview of system architecture, data flow, and dependencies.
            •	Why: Crucial for onboarding developers with a top-down understanding of the system.

            4.	Section Requirements
            Use the following sections for High-Level Understanding:
            ## Project Purpose  
            Provide a brief overview of the project, including its goals and the problems it solves. Use content from README.md.

            ## Core Features  
            List and describe the key features of the project. Use information from README.md and any relevant documentation files.

            ## Technology Stack  
            Explain the technologies and tools used to build the project, including frameworks, libraries, and databases. Use package.json for dependencies.

            ## Architecture Overview  
            Provide a summary of the project's structure and key components. If available, embed diagrams for better clarity.  

            5. Quick Start Guide

            Provide a simple guide to get the project up and running. Include setup instructions and primary scripts from README.md and package.json.
            
            6.	Behavior Guidelines for Generation

            •	Accuracy: Ensure the content is technically accurate and uses data from the mentioned files.
            •	Clarity: Write in a concise, clear, and beginner-friendly manner. Avoid using unexplained jargon.
            •	Consistency: Adhere to the MDX syntax for formatting, metadata, and embedding external files or diagrams.

            ${mdxGuidelines}  
    `,
  });

  return result.text;
};

export const generateCodeStructureDocs = async (
  files: Record<string, any>[]
) => {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
      `,
    system: `
          You are an expert MDX documentation generator for InDocify, a platform that creates structured, high-quality documentation to simplify developer onboarding. Your current task is to generate the **Code Structure and Organization** section of the documentation. Follow the detailed formatting and behavior guidelines below.
          Your goal is generate a documention which explains the architecture, file organization, and key configurations of the codebase so that the new developer understands the project structure and how to navigate it.
          If possible how the folders or files connect to each other using a diagram.
          You are to assume you are the senior developer of the project explaining the architecture, file organization, and key configurations of the codebase so that the developer hired understands the project structure and how to navigate it.
          
          ### **MDX Structure**

            1. **Frontmatter**  
            Every document must begin with a YAML-style frontmatter section containing the title and description. This identifies the section for readers.

            Example:  
            ---
            title: "Code Structure and Organization"
            description: "Detailed documentation explaining the architecture, file organization, and key configurations of the codebase."
            ---


            2.	Content Guidelines
                •	Use headings and subheadings to clearly separate key aspects of the project.
                •	Summarize the project’s code structure, core features, architecture, and technology stack in a concise, developer-friendly format.
                •	For each subheading, include detailed explanations that would eliminate the need for repetitive onboarding meetings.  

            ${mdxGuidelines}
    `,
  });

  return result.text;
};

export const generateProjectSetupDocs = async (
  files: Record<string, any>[],
  clone_url: string
) => {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
        Clone url: ${clone_url}
      `,
    system: `
          You are an expert MDX documentation generator for InDocify, a platform that creates structured, high-quality documentation to simplify developer onboarding. Your current task is to generate the **Setting Up the Development Environment** section of the documentation. Follow the detailed formatting and behavior guidelines below.
          Your goal is generate a documention which list the tools, technologies, and configurations needed to set up the development environment.
          You can include links to the documentation of the tools if necessary.
          You should take note of the package manager used in the project based on the files provided.
        
          Sections for the **Setting Up the Development Environment** section:
          ## Pre-requisites  
          List any pre-requisites required to set up the development environment, such as tools, frameworks, or libraries. Use information from package.json and any relevant documentation files.

          ## Installation steps
          Provide a step-by-step guide for installing and setting up the development environment. Use information from package.json and any relevant documentation files.

          ## Configuration  
          Describe any configuration settings or environment variables that need to be set up to run the project. Use information from package.json and any relevant documentation files.

          ## Running the project  
          Provide instructions for running the project from the command line or using a development environment. Use information from package.json and any relevant documentation files.

          ## Troubleshooting  
          Provide any known issues or challenges that developers may encounter when setting up the development environment. Use information from package.json and any relevant documentation files.


          ### **MDX Structure**

            1. **Frontmatter**  
            Every document must begin with a YAML-style frontmatter section containing the title and description. This identifies the section for readers.

            Example:  
            ---
            title: "Code Structure and Organization"
            description: "Detailed documentation explaining the architecture, file organization, and key configurations of the codebase."
            ---


            2.	Content Guidelines
                •	Use headings and subheadings to clearly separate key aspects of the project.
                •	Summarize the project’s code structure, core features, architecture, and technology stack in a concise, developer-friendly format.
                •	For each subheading, include detailed explanations that would eliminate the need for repetitive onboarding meetings.
                

            ${mdxGuidelines}
    `,
  });

  return result.text;
};

export const generateBestPracticesDocs = async (
  files: Record<string, any>[]
) => {
  const result = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: `
        These are the files and the content needed to help generate docs: ${JSON.stringify(files)}
      `,
    system: `
      You are a documentation assistant tasked with generating a **Coding Best Practices or Guidelines** section for a software project. Your goal is to help new developers understand the project's coding conventions, folder structures, naming conventions, and standards, ensuring consistency across the team. The output should focus on describing **best practices** and **guidelines** rather than explaining the functionality of the code.

       ### **MDX Structure**

            1. **Frontmatter**  
            Every document must begin with a YAML-style frontmatter section containing the title and description. This identifies the section for readers.

            Example:  
            ---
            title: "Code Structure and Organization"
            description: "Detailed documentation explaining the architecture, file organization, and key configurations of the codebase."
            ---


            2.	Content Guidelines
                •	Use headings and subheadings to clearly separate key aspects of the project.
                •	Summarize the project’s code structure, core features, architecture, and technology stack in a concise, developer-friendly format.
                •	For each subheading, include detailed explanations that would eliminate the need for repetitive onboarding meetings.
                

      Here are the specific requirements for generating this section based on the provided files. If the files do not contain the necessary information, please provide a clear and concise response that can be used to help developers understand the project's coding practices.

      1. **Folder and File Naming Conventions**:
        - Provide clear guidelines on how folders and files are organized and named in the project.
        - Explain how components, utilities, hooks, and other key elements are structured (e.g., components/ for UI components, lib/ for utilities).
        - Mention naming conventions such as **PascalCase** for components and **camelCase** for utilities.

      2. **Linting and Formatting**:
        - Identify linting and formatting tools used in the project (e.g., ESLint, Prettier).
        - Specify key rules, such as indentation, quotes, semicolons, trailing commas, etc.

      3. **Commit Message Guidelines**:
        - Include the commit message conventions, such as **Conventional Commits**.
        - Provide examples of proper commit messages (e.g., feat: add authentication module).

      4. **Testing Practices**:
        - Describe testing standards followed in the project (e.g., using Jest, Vitest, or other frameworks).
        - Include guidelines for organizing and naming test files (e.g., Navbar.test.tsx).

      5. **Version Control and Git Hooks**:
        - Outline any Git hooks in place, such as pre-commit or pre-push hooks (e.g., linting or testing checks using Husky).

      6. **Environment Variables**:
        - Explain how environment variables are managed using .env files.
        - Mention the purpose of .env.example as a template.

      7. **General Coding Practices**:
        - Provide rules for naming variables, constants, and functions.
        - Highlight any prohibited practices (e.g., mutating state directly, hardcoding values).
        - Mention any patterns developers should follow (e.g., separating business logic from UI components).

      8. **Tool-Specific Configurations**:
        - Include details about configuration files like .eslintrc, .prettierrc, jest.config.js, or commitlint.config.js.

      Your response must be concise, well-structured, and easy to follow. Avoid diving into the actual implementation details of the code but ensure the practices are actionable and directly applicable to the repository.

      In addition, detect and mention whether the project uses **npm**, **pnpm**, or another package manager, and tailor the guidelines accordingly. If possible, extract this information dynamically based on the project's package.json file or related files.

      ${mdxGuidelines}
          `,
  });

  return result.text;
};
