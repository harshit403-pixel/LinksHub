import axios from "axios";
import crypto from "crypto";
import GithubConnection from "../models/githubConnection.model.js";
import Knowledge from "../models/knowledge.model.js";
import { fetchRepository } from "../services/github.service.js";
import { summarizeProject } from "../services/knowledge.service.js";


export const connectGithub = (req, res) => {
  const state = crypto.randomBytes(32).toString("hex");

  res.cookie("github_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 10 * 60 * 1000,
  });

  const url =
    `https://github.com/login/oauth/authorize?` +
    `client_id=${process.env.GITHUB_CLIENT_ID}` +
    `&scope=read:user` +
    `&state=${state}`;

  res.redirect(url);
};

export const githubCallback = async (
  req,
  res,
  next
) => {
  try {
    const { code, state } = req.query;

    if (
      !state ||
      state !== req.cookies.github_oauth_state
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OAuth state.",
      });
    }

    res.clearCookie("github_oauth_state");

    if (!code) {
      return res.status(400).json({
        success: false,
        message: "Authorization code missing.",
      });
    }

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id:
          process.env.GITHUB_CLIENT_ID,
        client_secret:
          process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const accessToken =
      tokenResponse.data.access_token;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message:
          "GitHub authentication failed.",
      });
    }

    const githubUser = await axios.get(
      "https://api.github.com/user",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const githubId =
      githubUser.data.id.toString();

    const alreadyConnected =
      await GithubConnection.findOne({
        githubId,
      });

    if (
      alreadyConnected &&
      alreadyConnected.user.toString() !==
        req.user.id
    ) {
      return res.redirect(
        `${
          process.env.FRONTEND_URL ||
          "http://localhost:5173"
        }/dashboard/library?githubError=already-connected`
      );
    }

    await GithubConnection.findOneAndUpdate(
      {
        user: req.user.id,
      },
      {
        githubId,

        username:
          githubUser.data.login,

        avatar:
          githubUser.data.avatar_url,

        accessToken,

        connectedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
      }
    );

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:5173";

    res.redirect(
      `${frontendUrl}/dashboard/library?github=connected`
    );
  } catch (error) {
    next(error);
  }
};

export const getGithubConnection =async (req, res, next) => {
    try {
      const connection =
        await GithubConnection.findOne({
          user: req.user.id,
        });

      return res.json({
        success: true,
        data: connection,
      });
    } catch (error) {
      next(error);
    }
  };

export const getGithubRepositories = async (req, res, next) => {
    try {
      const connection =
        await GithubConnection.findOne({
          user: req.user.id,
        });

      if (!connection) {
        return res.status(404).json({
          success: false,
          message:
            "GitHub account not connected.",
        });
      }

      const response = await axios.get(
        "https://api.github.com/user/repos",
        {
          headers: {
            Authorization: `Bearer ${connection.accessToken}`,
            Accept:
              "application/vnd.github+json",
          },
          params: {
            per_page: 100,
            sort: "updated",
            affiliation: "owner",
          },
        }
      );

      const repositories =
        response.data.map((repo) => ({
          id: repo.id,
          name: repo.name,
          fullName: repo.full_name,
          description:
            repo.description || "",
          language: repo.language,
          stars:
            repo.stargazers_count,
          forks: repo.forks_count,
          private: repo.private,
          defaultBranch:
            repo.default_branch,
          htmlUrl: repo.html_url,
          homepage:
            repo.homepage || "",
          updatedAt:
            repo.updated_at,
          visibility:
            repo.visibility,
        }));

      return res.status(200).json({
        success: true,
        data: repositories,
      });
    } catch (error) {
      if (
        error.response?.status ===
          401 ||
        error.response?.status ===
          403
      ) {
        await GithubConnection.findOneAndDelete(
          {
            user: req.user.id,
          }
        );

        return res.status(401).json({
          success: false,
          message:
            "GitHub authorization expired. Please reconnect your GitHub account.",
        });
      }

      next(error);
    }
  };


  export const disconnectGithub = async (
  req,
  res,
  next
) => {
  try {
    const connection =
      await GithubConnection.findOne({
        user: req.user.id,
      });

    if (!connection) {
      return res.status(404).json({
        success: false,
        message:
          "No GitHub account is connected.",
      });
    }

    await connection.deleteOne();

    return res.status(200).json({
      success: true,
      message:
        "GitHub disconnected successfully.",
    });
  } catch (error) {
    next(error);
  }
};



export const importGithubRepositories =  async (req, res, next) => {
    try {
      const { repositories } = req.body;

      if (
        !repositories ||
        !repositories.length
      ) {
        return res.status(400).json({
          success: false,
          message:
            "No repositories selected.",
        });
      }

      const imported = [];
      const skipped = [];

      for (const githubUrl of repositories) {
        const exists =
          await Knowledge.findOne({
            owner: req.user.id,
            githubUrl,
          });

        if (exists) {
          skipped.push(githubUrl);
          continue;
        }

        const repo =
          await fetchRepository(githubUrl);

        const ai =
          await summarizeProject(repo);

        const project =
          await Knowledge.create({
            owner: req.user.id,

            type: "project",

            title: repo.title,

            description:
              repo.description,

            summary: ai.summary,

            githubUrl,

            demoUrl: repo.homepage,

            technologies:
              ai.technologies || [],

            concepts:
              ai.concepts || [],

            tags: ai.tags || [],

            questions:
              ai.questions || [],

            readme: repo.readme,
          });

        imported.push(project);
      }

      return res.status(201).json({
        success: true,

        message:
          "Repositories imported successfully.",

        data: {
          imported,
          skipped,
        },
      });
    } catch (error) {
      next(error);
    }
  };