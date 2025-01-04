# React Docs Generative AI chatbot

This chatbot is a generative AI chatbot that can answer questions about React documentation using RAG (retrieval augmented generation) pipeline.

 It is built using Next.js ai sdk and cheerio for web scraping and langchain to split the text into sentences. It uses drizzle ORM to store the embeddings of the scraped data and uses the embeddings to generate answers to the questions asked by the user.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


## Features

- **Generative AI Chatbot**: The chatbot is built using Vercel's AI SDK and can answer questions about React documentation.
- **RAG (retrieval augmented generation) pipeline**: The chatbot uses cheerio to scrape the React documentation website (or any website) and generate embeddings and store them to vector db.

## Deploy on Vercel

This project is deployed on vercel and can be accessed [here](react-docs-ai-1j0dtfttv-sathish39893s-projects.vercel.app/)

NOTE: there is a rate limit applied and hence the chatbot may not work after a certain number of requests.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

- [Learn Vercel ai sdk](https://sdk.vercel.ai/docs/introduction) - The AI SDK is the TypeScript toolkit designed to help developers build AI-powered applications with React, Next.js, Vue, Svelte, Node.js, and more.

- [RAG chatbot](https://sdk.vercel.ai/docs/guides/rag-chatbot) - Learn how to build a RAG (retrieval augmented generation) pipeline chatbot using Vercel's AI SDK.

- [Learn Cheerio](https://cheerio.js.org/) - Fast, flexible & lean implementation of core jQuery designed specifically for the server.
