import { geminiModel } from "../config/gemini.js";

export const searchKnowledge = async (query, projects) => {
  const context = projects
    .map(
      (project) => `
ID: ${project._id}
Title: ${project.title}

Summary:
${project.summary}

Description:
${project.description}

Technologies:
${project.technologies.join(", ")}

Concepts:
${project.concepts.join(", ")}

GitHub:
${project.githubUrl}

Demo:
${project.demoUrl || "N/A"}

----------------------------------------
`
    )
    .join("\n");

  const prompt = `
You are an AI assistant for a LinksHub profile.

Answer ONLY using the provided projects.

Return ONLY valid JSON.

Format:

{
  "answer":"short answer",
  "projects":[
    "PROJECT_ID_1",
    "PROJECT_ID_2"
  ]
}

Rules:
- projects MUST contain the IDs of the relevant projects.
- Never invent project IDs.
- If nothing matches:

{
  "answer":"I couldn't find any relevant project.",
  "projects":[]
}

User Question:
${query}

Projects:
${context}
`;

  const result = await geminiModel.generateContent(prompt);

  const text = result.response.text();

  const json = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(json);
};