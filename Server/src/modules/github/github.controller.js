import {
  buildGithubConnectUrl,
  completeGithubConnection,
  disconnectGithub as disconnectGithubService,
  getGithubConnection as getGithubConnectionService,
  getGithubRepositoriesForUser,
  importGithubRepositories as importGithubRepositoriesService,
} from "./github.service.js";

const handleStatusError = (res, error) => {
  if (!error.status) {
    return false;
  }

  return res.status(error.status).json({
    success: false,
    message: error.message,
  });
};

export const connectGithub = (req, res) => {
  const {
    state,
    url,
  } = buildGithubConnectUrl();

  res.cookie("github_oauth_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure:
      process.env.NODE_ENV === "production",
    maxAge: 10 * 60 * 1000,
  });

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

    const { redirectUrl } =
      await completeGithubConnection(
        req.user.id,
        code
      );

    res.redirect(redirectUrl);
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    next(error);
  }
};

export const getGithubConnection =
  async (req, res, next) => {
    try {
      const connection =
        await getGithubConnectionService(
          req.user.id
        );

      return res.json({
        success: true,
        data: connection,
      });
    } catch (error) {
      next(error);
    }
  };

export const getGithubRepositories =
  async (req, res, next) => {
    try {
      const repositories =
        await getGithubRepositoriesForUser(
          req.user.id
        );

      return res.status(200).json({
        success: true,
        data: repositories,
      });
    } catch (error) {
      if (handleStatusError(res, error)) {
        return;
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
    await disconnectGithubService(req.user.id);

    return res.status(200).json({
      success: true,
      message:
        "GitHub disconnected successfully.",
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    next(error);
  }
};

export const importGithubRepositories =
  async (req, res, next) => {
    try {
      const data =
        await importGithubRepositoriesService(
          req.user.id,
          req.body.repositories
        );

      return res.status(201).json({
        success: true,
        message:
          "Repositories imported successfully.",
        data,
      });
    } catch (error) {
      if (handleStatusError(res, error)) {
        return;
      }

      next(error);
    }
  };
