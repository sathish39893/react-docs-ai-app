import 'cheerio';
import { CheerioWebBaseLoader } from '@langchain/community/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { createResources } from '@/lib/actions/resources';
import { db } from '@/lib/db';
import { resources } from '@/lib/db/schema/resources';
import { eq } from 'drizzle-orm';

/**
 * Handles the POST request to process and store resources from a given URL.
 *
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} - The response object containing the status of the operation.
 *
 * The function performs the following steps:
 * 1. Parses the JSON body of the request to extract the URL.
 * 2. Validates the presence of the URL parameter.
 * 3. Checks if data for the given URL already exists in the database.
 * 4. If data exists, returns a 400 response with an error message.
 * 5. If data does not exist, loads the content from the URL using CheerioWebBaseLoader.
 * 6. Splits the loaded content into chunks using RecursiveCharacterTextSplitter.
 * 7. Stores the split content into the database.
 * 8. Returns a 200 response with the status of the database operation.
 */
export async function POST(req: Request): Promise<Response> {
  const { url } = await req.json();

  if (!url) {
    return Response.json(
      { error: 'Missing required parameters' },
      { status: 400 }
    );
  }

  const ifDataExists = await db
    .select()
    .from(resources)
    .where(eq(resources.source, url));

  if (ifDataExists.length > 0) {
    return Response.json({ error: 'Data already exists for the url' }, { status: 400 });
  }

  const pTagSelector = 'p';
  const cheerioLoader = new CheerioWebBaseLoader(url, {
    selector: pTagSelector,
  });

  const docs = await cheerioLoader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 2000, // 1000 characters
    chunkOverlap: 100,
  });
  const allSplits = await splitter.splitDocuments(docs);

  const dbResult = await createResources(
    allSplits.map((doc) => ({
      content: doc.pageContent,
      source: doc.metadata.source,
    }))
  );

  
  return Response.json(
    {
      status: dbResult,
    },
    { status: 200 }
  );
}
