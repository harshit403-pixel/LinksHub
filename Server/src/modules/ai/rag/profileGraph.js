import { Annotation, END, START, StateGraph } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { vectorStore } from "./vectorStore.js";

const model = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-2.5-flash",
  temperature: 0.2,
  maxOutputTokens: 700,
});

const ProfileAIState = Annotation.Root({
  query: Annotation(),
  ownerId: Annotation(),
  documents: Annotation({
    default: () => [],
  }),
  answer: Annotation({
    default: () => "",
  }),
  projectIds: Annotation({
    default: () => [],
  }),
});

const retrieveNode = async (state) => {
  const documents = await vectorStore.similaritySearch(
    state.query,
    6,
    {
      preFilter: {
        ownerId: {
          $eq: state.ownerId,
        },
        visibility: {
          $eq: "public",
        },
      },
    }
  );

  return {
    documents,
    projectIds: [
      ...new Set(
        documents
          .map((document) => document.metadata?.projectId)
          .filter(Boolean)
      ),
    ],
  };
};

const answerNode = async (state) => {
  if (!state.documents.length) {
    return {
      answer:
        "I couldn't find anything relevant in this developer's public projects.",
    };
  }

  const context = state.documents
    .map(
      (document, index) =>
        `SOURCE ${index + 1}\nProject ID: ${document.metadata?.projectId}\nProject: ${document.metadata?.title}\n\n${document.pageContent}`
    )
    .join("\n\n---\n\n");

  const response = await model.invoke([
    [
      "system",
      `You are the AI assistant for a developer's public LinksHub profile.

Answer the user's question using ONLY the supplied project context.
Do not invent technologies, experience, projects, metrics, or facts.
If the context does not contain enough information, say that clearly.
Keep the answer concise and useful.
Do not mention retrieval, embeddings, LangChain, LangGraph, or internal system details.

Project context:
${context}`,
    ],
    ["human", state.query],
  ]);

  return {
    answer:
      typeof response.content === "string"
        ? response.content
        : JSON.stringify(response.content),
  };
};
const graph = new StateGraph(ProfileAIState)
  .addNode("retrieve", retrieveNode)
  .addNode("generateAnswer", answerNode)
  .addEdge(START, "retrieve")
  .addEdge("retrieve", "generateAnswer")
  .addEdge("generateAnswer", END)
  .compile();

export const runProfileAI = async ({
  ownerId,
  query,
}) => {
  return graph.invoke({
    ownerId: ownerId.toString(),
    query: query.trim(),
  });
};
