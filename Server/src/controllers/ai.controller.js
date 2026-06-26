import { geminiModel }
from "../config/gemini.js";

export const generateBio =
  async (req, res) => {
      console.log(req.body);
    try {
      const {
        profession,
        skills,
        tone,
      } = req.body;

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
        await geminiModel.generateContent(
          prompt
        );

      const text =
        result.response.text();

      const bios = text
        .split("###")
        .map((bio) =>
          bio.trim()
        )
        .filter(Boolean);

      return res.status(200).json({
        bios,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          error.message,
      });
    }
  };