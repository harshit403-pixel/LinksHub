import { MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";

import config from "../../../config/config.js";

const uri = config.MONGO_URI;

if (!uri) {
  throw new Error(
    "MONGO_URI is required for the AI vector store."
  );
}

const dbName = (() => {
  try {
    const pathname = new URL(uri).pathname.replace(
      /^\//,
      ""
    );

    return pathname || "linktree";
  } catch {
    return "linktree";
  }
})();

const client = new MongoClient(uri);

const collectionName =
  process.env.MONGODB_VECTOR_COLLECTION ||
  "knowledge_vectors";

export const vectorCollection = client
  .db(dbName)
  .collection(collectionName);

/*
 * Gemini embeddings
 *
 * gemini-embedding-001
 * 768 dimensions
 */
const embeddings =
  new GoogleGenerativeAIEmbeddings({
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-embedding-001",
    taskType: TaskType.RETRIEVAL_DOCUMENT,
    outputDimensionality: 768,
  });

export const vectorStore =
  new MongoDBAtlasVectorSearch(
    embeddings,
    {
      collection: vectorCollection,

      indexName:
        process.env.MONGODB_VECTOR_INDEX ||
        "knowledge_vector_index",

      textKey: "text",

      embeddingKey: "embedding",
    }
  );

export const connectVectorStore =
  async () => {
    await client.connect();

    console.log(
      "Vector store connected"
    );

    await client
      .db(dbName)
      .command({ ping: 1 });
  };

export const closeVectorStore =
  async () => {
    await client.close();
  };