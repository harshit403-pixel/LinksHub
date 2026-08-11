import Knowledge from "../../models/knowledge.model.js";
import User from "../../models/user.model.js";

export const findProjectByOwnerAndGithubUrl = (
  ownerId,
  githubUrl
) =>
  Knowledge.findOne({
    owner: ownerId,
    githubUrl,
  });

export const createProject = (projectData) =>
  Knowledge.create(projectData);

export const findKnowledgeByOwner = (ownerId) =>
  Knowledge.find({
    owner: ownerId,
  }).sort({
    createdAt: -1,
  });

export const findUserByUsername = (
  username
) =>
  User.findOne({
    username,
  });

export const findPublicProjectsByOwner = (
  ownerId
) =>
  Knowledge.find({
    owner: ownerId,
    type: "project",
    visibility: "public",
  });

export const deleteProjectByIdAndOwner = (
  projectId,
  ownerId
) =>
  Knowledge.findOneAndDelete({
    _id: projectId,
    owner: ownerId,
  });
