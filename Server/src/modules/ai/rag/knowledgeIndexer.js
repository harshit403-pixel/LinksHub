import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorCollection, vectorStore } from "./vectorStore.js";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1200,
  chunkOverlap: 200,
});

const buildProjectText = (project) => `
Project: ${project.title}

Description:
${project.description || ""}

Summary:
${project.summary || ""}

Technologies:
${(project.technologies || []).join(", ")}

Concepts:
${(project.concepts || []).join(", ")}

Tags:
${(project.tags || []).join(", ")}

README:
${project.readme || ""}
`.trim();

export const indexProjectKnowledge = async (project) => {
  const text = buildProjectText(project);
  const chunks = await splitter.createDocuments([text]);

  const documents = chunks.map((chunk, index) =>
    new Document({
      pageContent: chunk.pageContent,
      metadata: {
        ownerId: project.owner.toString(),
        projectId: project._id.toString(),
        title: project.title,
        visibility: project.visibility,
        chunkIndex: index,
      },
    })
  );

  const ids = documents.map(
    (_, index) => `${project._id.toString()}-${index}`
  );

  await vectorStore.addDocuments(documents, { ids });

  return { chunks: documents.length };
};

export const deleteProjectKnowledge = async (projectId) => {
  const rows = await vectorCollection
    .find(
      {
        "metadata.projectId": projectId.toString(),
      },
      { projection: { _id: 1 } }
    )
    .toArray();

  if (!rows.length) return;

  await vectorStore.delete({
    ids: rows.map((row) => row._id.toString()),
  });
};
