import crypto from "crypto";
import { importProjectForUser } from "../knowledge/knowledge.service.js";
import {
  exchangeGithubCodeForToken,
  fetchGithubRepositories,
  fetchGithubUser,
} from "./github.api.js";
import * as githubDao from "./github.dao.js";

const createStatusError = (
  status,
  message
) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

const getFrontendUrl = () =>
  process.env.FRONTEND_URL ||
  "http://localhost:5173";

export const buildGithubConnectUrl = () => {
  const state =
    crypto.randomBytes(32).toString("hex");

  const url =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=read:user` +
    `&state=${state}`;

  return {
    state,
    url,
  };
};

export const completeGithubConnection =
  async (userId, code) => {
    const accessToken =
      await exchangeGithubCodeForToken(code);

    if (!accessToken) {
      throw createStatusError(
        400,
        "GitHub authentication failed."
      );
    }

    const githubUser =
      await fetchGithubUser(accessToken);

    const githubId =
      githubUser.data.id.toString();

    const alreadyConnected =
      await githubDao.findConnectionByGithubId(
        githubId
      );

    if (
      alreadyConnected &&
      alreadyConnected.user.toString() !== userId
    ) {
      return {
        redirectUrl:
          `${getFrontendUrl()}/dashboard/library?githubError=already-connected`,
      };
    }

    await githubDao.upsertConnectionByUser(
      userId,
      {
        githubId,
        username: githubUser.data.login,
        avatar: githubUser.data.avatar_url,
        accessToken,
        connectedAt: new Date(),
      }
    );

    return {
      redirectUrl:
        `${getFrontendUrl()}/dashboard/library?github=connected`,
    };
  };

export const getGithubConnection = (
  userId
) => githubDao.findConnectionByUser(userId);

export const getGithubRepositoriesForUser =
  async (userId) => {
    const connection =
      await githubDao.findConnectionByUser(
        userId
      );

    if (!connection) {
      throw createStatusError(
        404,
        "GitHub account not connected."
      );
    }

    try {
      const response =
        await fetchGithubRepositories(
          connection.accessToken
        );

      return response.data.map((repo) => ({
        id: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description || "",
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        private: repo.private,
        defaultBranch:
          repo.default_branch,
        htmlUrl: repo.html_url,
        homepage: repo.homepage || "",
        updatedAt: repo.updated_at,
        visibility: repo.visibility,
      }));
    } catch (error) {
      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        await githubDao.deleteConnectionByUser(
          userId
        );

        throw createStatusError(
          401,
          "GitHub authorization expired. Please reconnect your GitHub account."
        );
      }

      throw error;
    }
  };

export const disconnectGithub = async (
  userId
) => {
  const connection =
    await githubDao.findConnectionByUser(
      userId
    );

  if (!connection) {
    throw createStatusError(
      404,
      "No GitHub account is connected."
    );
  }

  await githubDao.deleteConnectionDocument(
    connection
  );
};

export const importGithubRepositories =
  async (userId, repositories) => {
    const connection =
  await githubDao.findConnectionByUser(userId);

if (!connection) {
  throw createStatusError(
    404,
    "GitHub account not connected."
  );
}
    if (
      !repositories ||
      !repositories.length
    ) {
      throw createStatusError(
        400,
        "No repositories selected."
      );
    }

    const imported = [];
    const skipped = [];

    for (const githubUrl of repositories) {
      try {
     const project =
  await importProjectForUser(
    userId,
    githubUrl,
    {
      fallbackQuestionsToEmpty: true,
      githubAccessToken:
        connection.accessToken,
    }
  );

        imported.push(project);
      } catch (error) {
        if (
          error.status === 409 &&
          error.message ===
            "Project already imported."
        ) {
          skipped.push(githubUrl);
          continue;
        }

        throw error;
      }
    }

    return {
      imported,
      skipped,
    };
  };
