import { geminiModel } from "../../config/gemini.js";

export const generateBio = async ({
  profession,
  skills,
  tone,
}) => {
  const prompt = `
Generate exactly 3 profile bios.

Profession:
${profession}

Skills:
${skills}

Tone:
${tone}

Requirements:
- Maximum 150 characters.
- Sound natural.
- Return only the bios.
- Separate each bio with ###.
`;

  const result =
    await geminiModel.generateContent(prompt);

  const text = result.response.text();

  return text
    .split("###")
    .map((bio) => bio.trim())
    .filter(Boolean);
};
