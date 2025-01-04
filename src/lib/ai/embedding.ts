import { embed, embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import { db } from '../db';
import { cosineDistance, desc, gt, sql } from 'drizzle-orm';
import { resources } from '../db/schema/resources';

const embeddingModel = openai.embedding('text-embedding-ada-002');
const similarityThreshold = 0.7;

const generateChunks = (input: string): string[] => {
  return input
    .trim()
    .split('.')
    .filter(i => i !== '');
};

export const generateEmbeddings = async (
  value: string,
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateMultipleEmbeddings = async (
  values: string[],
): Promise<Array<{ embedding: number[]; content: string }>> => {
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: values,
  });
  return embeddings.map((e, i) => ({ content: values[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\\n', ' ');
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

export const findRelevantContent = async (userQuery: string) => {
  const userQueryEmbedded = await generateEmbedding(userQuery);
  const similarity = sql<number>`1 - (${cosineDistance(
    resources.embedding,
    userQueryEmbedded,
  )})`;
  const similarGuides = await db
    .select({ name: resources.content, similarity })
    .from(resources)
    .where(gt(similarity, similarityThreshold))
    .orderBy(t => desc(t.similarity))
    .limit(4);
  return similarGuides;
};