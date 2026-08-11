import {
  deleteProject as deleteProjectService,
  getKnowledge as getKnowledgeService,
  importProjectForUser,
  searchProjects as searchProjectsService,
} from "./knowledge.service.js";

const handleStatusError = (res, error) => {
  if (!error.status) {
    return false;
  }

  return res.status(error.status).json({
    success: false,
    message: error.message,
  });
};

export const importProject = async (
  req,
  res,
  next
) => {
  try {
    const project =
      await importProjectForUser(
        req.user.id,
        req.body.githubUrl
      );

    return res.status(201).json({
      success: true,
      message: "Project imported successfully.",
      data: project,
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    next(error);
  }
};

export const getKnowledge = async (
  req,
  res,
  next
) => {
  try {
    const knowledge =
      await getKnowledgeService(req.user.id);

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
    const data =
      await searchProjectsService(req.body);

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    next(error);
  }
};

export const deleteProject = async (
  req,
  res,
  next
) => {
  try {
    await deleteProjectService(
      req.params.id,
      req.user.id
    );

    return res.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    next(error);
  }
};
