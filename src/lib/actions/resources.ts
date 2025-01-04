'use server';

import {
  NewResourceParams,
  insertResourceSchema,
} from '@/lib/db/schema/resources';
import { db } from '../db';
import { generateEmbedding } from '../ai/embedding';
import { resources } from '../db/schema/resources';

export const createResource = async (input: NewResourceParams) => {
  try {
    const { content, source } = insertResourceSchema.parse(input);

    const embedding = await generateEmbedding(content);
    await db.insert(resources).values({
      content,
      source,
      embedding,
    });

    return 'Resource successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};

export const createResources = async (values: NewResourceParams[]) => {
  try {
    for (const input of values) {
      const { content, source } = insertResourceSchema.parse(input);

      const embedding = await generateEmbedding(content);
      await db.insert(resources).values({
        content,
        source,
        embedding,
      });
    }

    return 'Resources successfully created and embedded.';
  } catch (error) {
    return error instanceof Error && error.message.length > 0
      ? error.message
      : 'Error, please try again.';
  }
};
