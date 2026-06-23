import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import User from '../models/user.model.js';
import cloudinary from '../config/cloudinary.js';

const generateToken = (userId) => {
    if (!config.JWT_SECRET) {
        throw new Error('JWT secret is not configured');
    }

    return jwt.sign({ id: userId }, config.JWT_SECRET, {
        expiresIn: '7d',
    });
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({
            $or: [ { email }, { username } ],
        });

        if (userExists) {
            return res.status(409).json({
                message: 'User already exists',
            });
        }

        const user = await User.create({
            username,
            email,
            password,
        });

       res.cookie('token', generateToken(user._id), {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

        return res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        if (error?.code === 11000) {
            const duplicateField = Object.keys(error.keyValue || {})[ 0 ] || 'field';

            return res.status(409).json({
                message: `${duplicateField} already exists`,
            });
        }

        return res.status(500).json({
            message: error.message || 'Failed to register user',
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        const user = await User.findOne({
            $or: [ { email: identifier }, { username: identifier } ],
        });

        if (!user) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        const isPasswordValid = await user.matchPassword(password);

        if (!isPasswordValid) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        res.cookie('token', generateToken(user._id))

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Failed to login user',
        });
    }
};

export const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.status(200).json({
    user,
  });
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
      await User.findById(
        req.user.id
      );
      if (theme) {
  user.theme = theme;
}

    if (!user) {
      return res.status(404).json({
        message:
          "User not found",
      });
    }

    user.displayName =
      displayName?.trim() || "";

    user.bio =
      bio?.trim() || "";

    await user.save();

const updatedUser =
  await User.findById(user._id)
    .select("-password");

return res.status(200).json({
  message:
    "Profile updated successfully",

  user: updatedUser,
});


  } catch (error) {
    return res.status(500).json({
      message:
        error.message,
    });
  }
};

export const uploadProfilePicture =
  async (req, res) => {
    try {
      console.log("STEP 1");

      if (!req.file) {
        return res.status(400).json({
          message: "Image required",
        });
      }

      console.log("STEP 2");

      const base64 =
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

      console.log("STEP 3");

      const result =
        await cloudinary.uploader.upload(
          base64,
          {
            folder:
              "linkshub/profile-pictures",
          }
        );

      console.log("STEP 4", result.secure_url);

      const user =
        await User.findById(
          req.user.id
        );

      console.log("STEP 5");

      user.profilePicture =
        result.secure_url;

      await user.save();

      console.log("STEP 6");

      return res.status(200).json({
        message:
          "Profile picture updated",
        profilePicture:
          result.secure_url,
      });
    } catch (error) {
      console.log("FAILED HERE");
      console.dir(error, {
        depth: null,
      });

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
