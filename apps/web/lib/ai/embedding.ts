import { embed } from "ai"; // Use `embed` for single embeddings
import { openai } from "@ai-sdk/openai";

const embeddingModel = openai.embedding("text-embedding-ada-002");

export const generateEmbedding = async (
  chunk: { content: string } // Accept a single chunk
): Promise<{ embedding: number[]; content: string }> => {
  // Generate embedding for the chunk
  const { embedding } = await embed({
    model: embeddingModel,
    value: chunk.content,
  });

  return {
    content: chunk.content,
    embedding,
  };
};
