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
  const { messages, repo } = await req.json();

  const result = streamText({
    model: openai("gpt-4o"),
    messages,
    system: `You are a helpful assistant for a repository. Check your knowledge base before answering any questions.
    Only respond to questions using information from tool calls.
    if no relevant information is found in the tool calls, respond, "Sorry, I don't know."
    The repository name is: ${repo}
    `,
    tools: {
      getInformation: tool({
        description: `get information from your knowledge base to answer questions.`,
        parameters: z.object({
          question: z.string().describe("the users question"),
          repo: z.string().describe("the repository to search"),
        }),
        execute: async ({ question, repo }) => {
          const queryEmbedding = await getQueryEmbedding(question);
          const chunks = await findRelevantChunks(repo, queryEmbedding);
          return chunks;
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
