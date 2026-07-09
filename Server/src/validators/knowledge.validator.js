import { z } from "zod";

export const importProjectSchema = z.object({
  githubUrl: z.string().url(),
});