import {
  getCurrentUser as getCurrentUserService,
  loginUser as loginUserService,
  registerUser as registerUserService,
  updateProfile as updateProfileService,
  uploadProfilePicture as uploadProfilePictureService,
} from "./auth.service.js";

const handleStatusError = (res, error) => {
  if (!error.status) {
    return false;
  }

  return res.status(error.status).json({
    message: error.message,
  });
};

export const registerUser = async (
  req,
  res
) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    const {
      token,
      user,
    } = await registerUserService({
      username,
      email,
      password,
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error?.code === 11000) {
      const duplicateField =
        Object.keys(
          error.keyValue || {}
        )[0] || "field";

      return res.status(409).json({
        message: `${duplicateField} already exists`,
      });
    }

    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message:
        error.message ||
        "Failed to register user",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const {
      identifier,
      password,
    } = req.body;

    const {
      token,
      user,
    } = await loginUserService({
      identifier,
      password,
    });

    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (handleStatusError(res, error)) {
      return;
    }

    return res.status(500).json({
      message:
        error.message ||
        "Failed to login user",
    });
  }
};

export const getCurrentUser = async (
  req,
  res
) => {
  try {
    const user =
      await getCurrentUserService(
        req.user.id
      );

    return res.status(200).json({
      user,
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

export const updateProfile = async (
  req,
  res
) => {
  try {
    const {
      displayName,
      bio,
      theme,
    } = req.body;

    const user =
      await updateProfileService(
        req.user.id,
        {
          displayName,
          bio,
          theme,
        }
      );

    return res.status(200).json({
      message:
        "Profile updated successfully",
      user,
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

export const uploadProfilePicture =
  async (req, res) => {
    try {
      const profilePicture =
        await uploadProfilePictureService(
          req.user.id,
          req.file
        );

      return res.status(200).json({
        message: "Profile picture updated",
        profilePicture,
      });
    } catch (error) {
      console.log("FAILED HERE");
      console.dir(error, {
        depth: null,
      });

      if (handleStatusError(res, error)) {
        return;
      }

      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const logoutUser = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
