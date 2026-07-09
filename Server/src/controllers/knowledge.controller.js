import Knowledge from "../models/knowledge.model.js";
import User from "../models/user.model.js";
import { fetchRepository } from "../services/github.service.js";
import { summarizeProject } from "../services/knowledge.service.js";
import { searchKnowledge } from "../services/search.service.js";

export const importProject = async (req, res, next) => {
  try {
    const { githubUrl } = req.body;

    if (!githubUrl) {
      return res.status(400).json({
        success: false,
        message: "GitHub URL is required.",
      });
    }

    const existingProject = await Knowledge.findOne({
      owner: req.user.id,
      githubUrl,
    });

    if (existingProject) {
      return res.status(409).json({
        success: false,
        message: "Project already imported.",
      });
    }

    const repo = await fetchRepository(githubUrl);

    const ai = await summarizeProject(repo);

    const project = await Knowledge.create({
      owner: req.user.id,

      type: "project",

      title: repo.title,

      description: repo.description,

      summary: ai.summary,

      githubUrl,

      demoUrl: repo.homepage,

      technologies: ai.technologies || [],

      concepts: ai.concepts || [],

      tags: ai.tags || [],

questions: ai.questions,



      readme: repo.readme,
    });

    return res.status(201).json({
      success: true,
      message: "Project imported successfully.",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

export const getKnowledge = async (req, res, next) => {
  try {
    const knowledge = await Knowledge.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      data: knowledge,
    });
  } catch (error) {
    next(error);
  }
};

export const searchProjects = async (
  req,
  res,
  next
) => {
  try {
    const { username, query } = req.body;

    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required.",
      });
    }

    if (!query?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Query is required.",
      });
    }

    const user = await User.findOne({
      username,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Profile not found.",
      });
    }

    const projects = await Knowledge.find({
      owner: user._id,
      type: "project",
      visibility: "public",
    });

    if (!projects.length) {
      return res.status(404).json({
        success: false,
        message: "No public projects found.",
      });
    }

    const aiResponse =
      await searchKnowledge(
        query,
        projects
      );

    const matchedProjects =
      projects.filter((project) =>
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
        technologies:
          project.technologies,
        tags: project.tags,
      }));

    return res.status(200).json({
      success: true,
      data: {
        answer: aiResponse.answer,
        projects: formattedProjects,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const deleteProject = async (
  req,
  res,
  next
) => {
  try {
    const project =
      await Knowledge.findOneAndDelete({
        _id: req.params.id,
        owner: req.user.id,
      });

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found.",
      });
    }

    return res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    next(error);
  }
};