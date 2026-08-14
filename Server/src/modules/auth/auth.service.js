import jwt from "jsonwebtoken";
import config from "../../config/config.js";
import * as authDao from "./auth.dao.js";
import cloudinary from "../../config/cloudinary.js";
import crypto from "crypto";

const createStatusError = (
  status,
  message
) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const generateToken = (userId) => {
  if (!config.JWT_SECRET) {
    throw new Error("JWT secret is not configured");
  }

  return jwt.sign(
    { id: userId },
    config.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

export const registerUser = async ({
  username,
  email,
  password,
}) => {
  const userExists =
    await authDao.findExistingUser({
      email,
      username,
    });

  if (userExists) {
    throw createStatusError(
      409,
      "User already exists"
    );
  }

  const user = await authDao.createUser({
    username,
    email,
    password,
  });

  return {
    token: generateToken(user._id),
    user,
  };
};

export const loginUser = async ({
  identifier,
  password,
}) => {
  const user =
    await authDao.findUserByIdentifier(
      identifier
    );

  if (!user) {
    throw createStatusError(
      401,
      "Invalid credentials"
    );
  }

  const isPasswordValid =
    await user.matchPassword(password);

  if (!isPasswordValid) {
    throw createStatusError(
      401,
      "Invalid credentials"
    );
  }

  return {
    token: generateToken(user._id),
    user,
  };
};

export const getCurrentUser = async (userId) => {
  const user =
    await authDao.findUserByIdWithoutPassword(
      userId
    );

  if (!user) {
    throw createStatusError(
      404,
      "User not found"
    );
  }

  return user;
};

export const updateProfile = async (
  userId,
  {
    displayName,
    bio,
    theme,
  }
) => {
  const user = await authDao.findUserById(userId);

  if (theme) {
    user.theme = theme;
  }

  if (!user) {
    throw createStatusError(
      404,
      "User not found"
    );
  }

  user.displayName =
    displayName?.trim() || "";

  user.bio = bio?.trim() || "";

  await user.save();

  return authDao.findUserByIdWithoutPassword(
    user._id
  );
};

export const uploadProfilePicture = async (
  userId,
  file
) => {


  if (!file) {
    throw createStatusError(
      400,
      "Image required"
    );
  }


  const base64 =
    `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;



  const result =
    await cloudinary.uploader.upload(
      base64,
      {
        folder: "linkshub/profile-pictures",
      }
    );



  const user = await authDao.findUserById(userId);


  user.profilePicture = result.secure_url;

  await user.save();


  return result.secure_url;
};


export const findOrCreateGoogleUser = async ({
  googleId,
  email,
  displayName,
  profilePicture,
}) => {
  // 1. Check if Google account is already connected
  let user = await authDao.findUserByGoogleId(
    googleId
  );

  if (user) {
    return user;
  }

  // 2. Check if an account already exists
  // with the same email
  user = await authDao.findUserByEmail(email);

  if (user) {
    user.googleId = googleId;

    if (
      !user.profilePicture &&
      profilePicture
    ) {
      user.profilePicture = profilePicture;
    }

    await user.save();

    return user;
  }

  // 3. Generate a unique username
  const baseUsername =
    email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  let username = baseUsername;
  let counter = 1;

  while (
    await authDao.findUserByUsername(username)
  ) {
    username = `${baseUsername}${counter}`;
    counter++;
  }

  // 4. Generate an internal random password
  // Google users never see or use this password.
  const password =
    crypto.randomBytes(32).toString("hex");

  // 5. Create the user
  return authDao.createGoogleUser({
    googleId,
    email,
    username,
    displayName,
    profilePicture,
    password,
  });
};