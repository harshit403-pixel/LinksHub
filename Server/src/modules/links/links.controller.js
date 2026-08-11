import {
  bulkCreateLinks as bulkCreateLinksService,
  createLink as createLinkService,
  deleteLink as deleteLinkService,
  getAllLinkAnalytics,
  getDeletedLinks as getDeletedLinksService,
  getLinkAnalytics as getLinkAnalyticsService,
  getLinksByUsername as getLinksByUsernameService,
  getMyLinks as getMyLinksService,
  importLinktree as importLinktreeService,
  purgeDeletedLink as purgeDeletedLinkService,
  redirectToLink as redirectToLinkService,
  reorderLinks as reorderLinksService,
  restoreDeletedLink as restoreDeletedLinkService,
  updateLink as updateLinkService,
} from "./links.service.js";

const handleStatusError = (res, error) => {
  if (!error.status) {
    return false;
  }

  return res.status(error.status).json({
    message: error.message,
  });
};

export const createLink = async (
  req,
  res
) => {
  try {
    const link = await createLinkService(
      req.user,
      req.body
    );

    return res.status(201).json({
      message: "Link created successfully",
      link,
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message:
        error.message ||
        "Failed to create link",
    });
  }
};

export const getLinksByUsername = async (
  req,
  res
) => {
  try {
    const response =
      await getLinksByUsernameService(
        req.params.username,
        req
      );

    return res.status(200).json(response);
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message:
        error.message ||
        "Failed to retrieve links",
    });
  }
};

export const deleteLink = async (
  req,
  res
) => {
  try {
    await deleteLinkService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      message: "Link deleted successfully",
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDeletedLinks = async (
  req,
  res
) => {
  try {
    const links =
      await getDeletedLinksService(
        req.user.id
      );

    return res.status(200).json({
      links,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const purgeDeletedLink = async (
  req,
  res
) => {
  try {
    await purgeDeletedLinkService(
      req.params.id,
      req.user.id
    );

    return res.status(200).json({
      message: "Link permanently removed",
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const redirectToLink = async (
  req,
  res
) => {
  try {
    const url = await redirectToLinkService(
      req.params.linkId,
      req.ip
    );

    return res.redirect(url);
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const restoreDeletedLink = async (
  req,
  res
) => {
  try {
    const link =
      await restoreDeletedLinkService(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      message: "Link restored successfully",
      link,
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getLinkAnalytics = async (
  req,
  res
) => {
  try {
    const analytics =
      await getLinkAnalyticsService(
        req.params.id,
        req.user.id
      );

    return res.status(200).json({
      analytics,
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllLinkAnalyticsController = async (
  req,
  res,
  next
) => {
  try {
    const analytics =
      await getAllLinkAnalytics(
        req.user.id
      );

    return res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    next(error);
  }
};

export const updateLink = async (
  req,
  res
) => {
  try {
    const link = await updateLinkService(
      req.user.id,
      {
        id: req.params.id,
        ...req.body,
      }
    );

    return res.status(200).json({
      message: "Link updated successfully",
      link,
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getMyLinks = async (
  req,
  res
) => {
  try {
    const links = await getMyLinksService(
      req.user.id
    );

    return res.status(200).json({
      links,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};


export const reorderLinks = async (
  req,
  res
) => {
  try {
    await reorderLinksService(
      req.user.id,
      req.body.links
    );

    return res.status(200).json({
      message:
        "Links reordered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const importLinktree = async (
  req,
  res
) => {
  try {
    const links =
      await importLinktreeService(
        req.body.url
      );

    return res.json({
      message: "Links fetched successfully",
      links,
    });
  } catch (error) {
    console.log(
      "Import Linktree Error:",
      error.response?.status,
      error.response?.data ||
        error.message
    );

    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message:
        error.response?.data ||
        error.message ||
        "Failed to import links",
    });
  }
};

export const bulkCreateLinks = async (
  req,
  res
) => {
  try {
    const result =
      await bulkCreateLinksService(
        req.user,
        req.body.links
      );

    return res.status(result.status).json({
      message: result.message,
      imported: result.imported,
      skipped: result.skipped,
      links: result.links,
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message: error.message,
    });
  }
};
