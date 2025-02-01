"use server";

import { Project } from "ts-morph";
import { parse } from "python-ast";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import JSZip from "jszip";
import { auth } from "@/auth";
import { EXCLUDED_FILES } from "@/utils/data";

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
    model: openai("gpt-4-turbo"),
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
