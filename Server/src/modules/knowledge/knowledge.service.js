import { geminiModel } from "../../config/gemini.js";
import { fetchRepository } from "../github/github.api.js";
import * as knowledgeDao from "./knowledge.dao.js";

const createStatusError = (
  status,
  message
) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

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

const searchKnowledge = async (
  query,
  projects
) => {
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

  const result =
    await geminiModel.generateContent(prompt);

  const text = result.response.text();

  const json = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(json);
};

export const importProjectForUser = async (
  userId,
  githubUrl,
  {
    fallbackQuestionsToEmpty = false,
  } = {}
) => {
  if (!githubUrl) {
    throw createStatusError(
      400,
      "GitHub URL is required."
    );
  }

  const existingProject =
    await knowledgeDao.findProjectByOwnerAndGithubUrl(
      userId,
      githubUrl
    );

  if (existingProject) {
    throw createStatusError(
      409,
      "Project already imported."
    );
  }

  const repo = await fetchRepository(githubUrl);
  const ai = await summarizeProject(repo);

  return knowledgeDao.createProject({
    owner: userId,
    type: "project",
    title: repo.title,
    description: repo.description,
    summary: ai.summary,
    githubUrl,
    demoUrl: repo.homepage,
    technologies: ai.technologies || [],
    concepts: ai.concepts || [],
    tags: ai.tags || [],
    questions: fallbackQuestionsToEmpty
      ? ai.questions || []
      : ai.questions,
    readme: repo.readme,
  });
};

export const getKnowledge = (userId) =>
  knowledgeDao.findKnowledgeByOwner(userId);

export const searchProjects = async ({
  username,
  query,
}) => {
  if (!username) {
    throw createStatusError(
      400,
      "Username is required."
    );
  }

  if (!query?.trim()) {
    throw createStatusError(
      400,
      "Query is required."
    );
  }

  const user =
    await knowledgeDao.findUserByUsername(
      username
    );

  if (!user) {
    throw createStatusError(
      404,
      "Profile not found."
    );
  }

  const projects =
    await knowledgeDao.findPublicProjectsByOwner(
      user._id
    );

  if (!projects.length) {
    throw createStatusError(
      404,
      "No public projects found."
    );
  }

  const aiResponse =
    await searchKnowledge(query, projects);

  const matchedProjects = projects.filter(
    (project) =>
      aiResponse.projects.includes(
        project._id.toString()
      )
  );

  const formattedProjects =
    matchedProjects.map((project) => ({
      _id: project._id,
      title: project.title,
      summary: project.summary,
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl,
      technologies: project.technologies,
      tags: project.tags,
    }));

  return {
    answer: aiResponse.answer,
    projects: formattedProjects,
  };
};

export const deleteProject = async (
  projectId,
  userId
) => {
  const project =
    await knowledgeDao.deleteProjectByIdAndOwner(
      projectId,
      userId
    );

  if (!project) {
    throw createStatusError(
      404,
      "Project not found."
    );
  }
};
