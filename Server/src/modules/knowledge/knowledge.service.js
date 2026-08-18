import { geminiModel } from "../../config/gemini.js";
import { fetchRepository } from "../github/github.api.js";
import * as knowledgeDao from "./knowledge.dao.js";
import { indexProjectKnowledge, deleteProjectKnowledge } from "../ai/rag/knowledgeIndexer.js";
import { runProfileAI } from "../ai/rag/profileGraph.js";

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

export const importProjectForUser = async (
  userId,
  githubUrl,
  {
    fallbackQuestionsToEmpty = false,
    githubAccessToken,
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

const repo =
  await fetchRepository(
    githubUrl,
    githubAccessToken
  );
  const ai = await summarizeProject(repo);

  const project = await knowledgeDao.createProject({
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

  try {
    await indexProjectKnowledge(project);
  } catch (error) {
    await knowledgeDao.deleteProjectByIdAndOwner(
      project._id,
      userId
    );
    throw error;
  }

  return project;
};

export const getKnowledge = (userId) =>
  knowledgeDao.findKnowledgeByOwner(userId);

export const searchProjects = async ({
  username,
  query,
}) => {
  if (!username) {
    throw createStatusError(400, "Username is required.");
  }

  if (!query?.trim()) {
    throw createStatusError(400, "Query is required.");
  }

  const user = await knowledgeDao.findUserByUsername(username);

  if (!user) {
    throw createStatusError(404, "Profile not found.");
  }

  const projects = await knowledgeDao.findPublicProjectsByOwner(user._id);

  if (!projects.length) {
    throw createStatusError(404, "No public projects found.");
  }

  const graphResult = await runProfileAI({
    ownerId: user._id,
    query,
  });

  const matchedProjects = projects.filter((project) =>
    graphResult.projectIds.includes(project._id.toString())
  );

  return {
    answer: graphResult.answer,
    projects: matchedProjects.map((project) => ({
      _id: project._id,
      title: project.title,
      summary: project.summary,
      githubUrl: project.githubUrl,
      demoUrl: project.demoUrl,
      technologies: project.technologies,
      tags: project.tags,
    })),
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

  await deleteProjectKnowledge(projectId);
};
