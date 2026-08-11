import axios from "axios";
import * as cheerio from "cheerio";
import ogs from "open-graph-scraper";
import { detectVisitor } from "../../utils/detectVisitor.js";
import { fetchLinkPreview } from "../../utils/fetchLinkPreview.js";
import { getLinkCategory } from "../../utils/getLinkCategory.js";
import { getLinkRole } from "../../utils/getLinkRole.js";
import { rankLinks } from "../../utils/rankLinks.js";
import * as linksDao from "./links.dao.js";

const createStatusError = (
  status,
  message
) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const createLink = async (
  user,
  {
    title,
    url,
  }
) => {
  if (!title || !url) {
    throw createStatusError(
      400,
      "Title and URL are required"
    );
  }

  let previewTitle = "";
  let previewDescription = "";
  let previewImage = "";

  try {
    const { result } = await ogs({
      url,
    });

    previewTitle = result.ogTitle || "";
    previewDescription =
      result.ogDescription || "";
    previewImage =
      result.ogImage?.[0]?.url ||
      result.ogImage?.url ||
      "";
  } catch (error) {
    console.log("Preview fetch failed");
  }

  const lastLink =
    await linksDao.findLastLinkByUser(user.id);

  return linksDao.createLink({
    user: user.id,
    title,
    url,
    category: getLinkCategory(url),
    previewTitle,
    previewDescription,
    previewImage,
    role: getLinkRole(url),
    order: (lastLink?.order || 0) + 1,
  });
};

export const getLinksByUsername = async (
  username,
  req
) => {
  const user =
    await linksDao.findUserByUsername(
      username
    );

  if (!user) {
    throw createStatusError(
      404,
      "User not found"
    );
  }

  const links =
    await linksDao.findActiveLinksByUser(
      user._id
    );

  const projects =
    await linksDao.findPublicProjectsByOwner(
      user._id
    );

  const visitorType = detectVisitor(req);
  const rankedLinks = rankLinks(
    links,
    visitorType
  );

  const response = {
    message: "Links retrieved successfully",
    profile: {
      username: user.username,
      displayName: user.displayName,
      bio: user.bio,
      theme: user.theme,
      profilePicture: user.profilePicture,
    },
    projects,
    links: rankedLinks,
  };

  if (
    process.env.NODE_ENV !== "production"
  ) {
    response.visitorType = visitorType;
  }

  return response;
};

export const deleteLink = async (
  linkId,
  userId
) => {
  const link =
    await linksDao.findActiveOwnedLink(
      linkId,
      userId
    );

  if (!link) {
    throw createStatusError(
      404,
      "Link not found"
    );
  }

  link.isDeleted = true;
  link.deletedAt = new Date();

  await linksDao.saveLink(link);
};

export const getDeletedLinks = (userId) =>
  linksDao.findDeletedLinksByUser(userId);

export const purgeDeletedLink = async (
  linkId,
  userId
) => {
  const link =
    await linksDao.findDeletedOwnedLink(
      linkId,
      userId
    );

  if (!link) {
    throw createStatusError(
      404,
      "Link not found"
    );
  }

  await linksDao.deleteLinkDocument(link);
};

export const redirectToLink = async (
  linkId,
  ipAddress
) => {
  const link =
    await linksDao.findActiveLinkById(linkId);

  if (!link) {
    throw createStatusError(
      404,
      "Link not found"
    );
  }

  await linksDao.createClick({
    link: link._id,
    ipAddress,
  });

  link.clicks += 1;

  await linksDao.saveLink(link);

  return link.url;
};

export const restoreDeletedLink = async (
  linkId,
  userId
) => {
  const link =
    await linksDao.findDeletedOwnedLink(
      linkId,
      userId
    );

  if (!link) {
    throw createStatusError(
      404,
      "Link not found"
    );
  }

  link.isDeleted = false;
  link.deletedAt = null;

  await linksDao.saveLink(link);

  return link;
};

export const getLinkAnalytics = async (
  linkId,
  userId
) => {
  const link =
    await linksDao.findActiveOwnedLink(
      linkId,
      userId
    );

  if (!link) {
    throw createStatusError(
      404,
      "Link not found"
    );
  }

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(
    sevenDaysAgo.getDate() - 6
  );

  return linksDao.aggregateClicksByLinkSince(
    linkId,
    sevenDaysAgo
  );
};

export const updateLink = async (
  userId,
  {
    id,
    title,
    url,
  }
) => {
  const links =
    await linksDao.findActiveLinksByUserSorted(
      userId
    );

  if (!title?.trim() || !url?.trim()) {
    throw createStatusError(
      400,
      "Title and URL are required"
    );
  }

  if (!link) {
    throw createStatusError(
      404,
      "Link not found"
    );
  }

  if (title) {
    link.title = title;
  }

  if (url) {
    link.url = url;
    link.category = getLinkCategory(url);
  }

  await linksDao.saveLink(link);

  return link;
};

export const getMyLinks = (userId) =>
  linksDao.findActiveLinksByUser(userId);

export const reorderLinks = async (
  userId,
  links
) => {
  await Promise.all(
    links.map((link) =>
      linksDao.updateLinkOrder(
        link.id,
        userId,
        link.order
      )
    )
  );
};

export const importLinktree = async (url) => {
  if (!url) {
    throw createStatusError(
      400,
      "Linktree URL is required"
    );
  }

  if (!url.includes("linktr.ee")) {
    throw createStatusError(
      400,
      "Invalid Linktree URL"
    );
  }

  const { data } = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language":
        "en-US,en;q=0.9",
      Referer: "https://linktr.ee/",
    },
    timeout: 10000,
  });

  const $ = cheerio.load(data);
  const nextData = $("#__NEXT_DATA__").html();

  if (!nextData) {
    throw createStatusError(
      400,
      "Unable to parse Linktree profile"
    );
  }

  const parsed = JSON.parse(nextData);



  return (
    parsed.props?.pageProps?.links
      ?.filter(
        (link) => link.url && !link.locked
      )
      .map((link) => ({
        title: link.title || "Untitled",
        url: link.url,
      })) || []
  );
};

export const bulkCreateLinks = async (
  user,
  links
) => {
  if (
    !links ||
    !Array.isArray(links) ||
    links.length === 0
  ) {
    throw createStatusError(
      400,
      "No links provided"
    );
  }

  const existingLinks =
    await linksDao.findLinksByUser(user.id);

  const existingUrls = new Set(
    existingLinks.map((link) => link.url)
  );

  const filteredLinks = links.filter(
    (link) => !existingUrls.has(link.url)
  );

  if (filteredLinks.length === 0) {
    return {
      message: "All links already exist",
      imported: 0,
      skipped: links.length,
      links: [],
      status: 200,
    };
  }

  const lastLink =
    await linksDao.findLastLinkByUser(user.id);

  const lastOrder = lastLink?.order || 0;

  const docs = filteredLinks.map(
    (link, index) => ({
      user: user.id,
      title: link.title,
      url: link.url,
      category: getLinkCategory(link.url),
      role: getLinkRole(link.url),
      order: lastOrder + index + 1,
    })
  );

  const created =
    await linksDao.insertManyLinks(docs);

  created.forEach(async (link) => {
    const preview =
      await fetchLinkPreview(link.url);

    await linksDao.updateLinkById(
      link._id,
      preview
    );
  });

  return {
    message: "Links imported successfully",
    imported: created.length,
    skipped: links.length - created.length,
    links: created,
    status: 201,
  };
};

export const getAllLinkAnalytics = async (
  userId
) => {
  const startDate = new Date();

  startDate.setDate(
    startDate.getDate() - 6
  );

  startDate.setHours(0, 0, 0, 0);

  return linksDao.aggregateClicksByUserSince(
    userId,
    startDate
  );
};