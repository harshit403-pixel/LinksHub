import { geminiModel } from "../config/gemini.js";

export const summarizeProject = async (
  project
) => {
  const prompt = `
Return ONLY valid JSON.

Repository:
${project.title}

Description:
${project.description}

README:
${project.readme}

Generate:

{
  "summary":"",
  "technologies":[],
  "concepts":[],
  "tags":[],
  "questions":[]
}

Rules:

- summary should be 2-4 sentences.
- technologies should contain the main technologies used.
- concepts should contain major concepts implemented.
- tags should be useful keywords.
- questions should contain 5 natural questions someone visiting the profile would ask.

Example questions:

- How was ${project.title} built?
- What technologies were used in ${project.title}?
- What problem does ${project.title} solve?
- What did you learn while building ${project.title}?
- Explain the architecture of ${project.title}.
`;

  const result =
    await geminiModel.generateContent(prompt);

  const text = result.response.text();

  return JSON.parse(
    text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim()
  );
};