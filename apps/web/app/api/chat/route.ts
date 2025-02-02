import { auth } from "@/auth";
import { createSupabaseClient } from "@/lib/supabaseClient";
import { openai } from "@ai-sdk/openai";
import { embed, streamText, tool } from "ai";
import { z } from "zod";

const embeddingModel = openai.embedding("text-embedding-ada-002");

async function getQueryEmbedding(query: string) {
  const { embedding } = await embed({
    model: embeddingModel,
    value: query,
  });
  return embedding;
}

async function findRelevantChunks(
  repo: string,
  queryEmbedding: number[],
  topK = 5
) {
  const session = await auth();
  const supabase = await createSupabaseClient(
    session?.supabaseAccessToken as string
  );
  const { data, error } = await supabase
    .rpc("find_similar_chunks", {
      repo,
      query_embedding: queryEmbedding,
      top_k: topK,
    })
    .select("file_path, content");

  console.log("data", data);

  if (error) {
    console.error("Error querying embeddings:", error);
    return [];
  }

  return data;
}
// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, repo, currentThread, owner } = await req.json();
  const session = await auth();
  const supabase = createSupabaseClient(session?.supabaseAccessToken as string);

  const result = streamText({
    model: openai("gpt-4o"),
    onFinish: async (result) => {
      //save the text to the database
      const history = [
        ...messages,
        {
          role: "assistant",
          content: result.text,
        },
      ];
      const { error } = await supabase.from("threads").upsert(
        {
          messages: history,
          thread_id: currentThread,
          repo,
          email: session?.user?.email as string,
          title: result.text,
          owner,
        },
        {
          onConflict: "thread_id",
        }
      );

      if (error) {
        console.error("Error upserting thread:", error);
      }
    },
    messages,
    system: `
    **Role:**  
    You are a helpful AI assistant specialized in answering questions about a specific GitHub repository.
    You retrieve file content and paths using a database tool and respond based on the retrieved data.
    
    The repository name is ${repo}

    ### Rules:
    1. **Keyword Search Only**: You do not generate queries for insertion, deletion, or updates. You only perform SELECT queries.
    2. **Knowledge Handling**:
      - If relevant data is found, you use it to construct an informative response.
      - If no relevant data is found, let the user know.
    3. **General Conversations**: 
      - If the user greets you (e.g., "Hello"), respond naturally.
      - If the user asks about your identity, say: "I am an AI assistant that helps you explore the repository."
      - Do not attempt to generate SQL queries for such casual questions.

    ### Examples:
    - **User:** "Where is the auth.js file located?"
      - **AI Action:** Search for "auth.js" in the database.
      - **AI Response (if found):** "The file \`auth.js\` is located at \`src/auth/auth.js\`."
      - **AI Response (if not found):** "Sorry, I don't have any idea about it."
      
    - **User:** "What does the README/readme say?"
      - **AI Action:** Search for "README" or "readme" in the database.
      - **AI Response (if found):** "The README.md file contains: 'Welcome to the project...'"

    - **User:** "Hello!"
      - **AI Response:** "Hello! How can I assist you with the repository?"
    
      `,
    tools: {
      // getInformation: tool({
      //   description: `get information from your knowledge base to answer questions.`,
      //   parameters: z.object({
      //     question: z.string().describe("the users question"),
      //     repo: z.string().describe("the repository to search"),
      //   }),
      //   execute: async ({ question, repo }) => {
      //     const queryEmbedding = await getQueryEmbedding(question);
      //     const chunks = await findRelevantChunks(repo, queryEmbedding);
      //     return chunks;
      //   },
      // }),
      searchFiles: tool({
        description: `search for files in a repository based on a user's query.`,
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
  });

  return result.toDataStreamResponse();
}
