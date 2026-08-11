import { generateBio as generateBioService } from "./ai.service.js";

export const generateBio = async (
  req,
  res
) => {


  try {
    const bios = await generateBioService(
      req.body
    );

    return res.status(200).json({
      bios,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
