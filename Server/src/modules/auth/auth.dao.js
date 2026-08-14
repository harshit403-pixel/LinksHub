import User from "../../models/user.model.js";

export const findExistingUser = ({
  email,
  username,
}) =>
  User.findOne({
    $or: [{ email }, { username }],
  });

export const createUser = (userData) =>
  User.create(userData);

export const findUserByIdentifier = (
  identifier
) =>
  User.findOne({
    $or: [
      { email: identifier },
      { username: identifier },
    ],
  });

export const findUserById = (userId) =>
  User.findById(userId);

export const findUserByIdWithoutPassword = (
  userId
) => User.findById(userId).select("-password");



export const findUserByGoogleId = async (
  googleId
) => {
  return User.findOne({
    googleId,
  });
};

export const findUserByEmail = async (
  email
) => {
  return User.findOne({
    email,
  });
};

export const createGoogleUser = async ({
  googleId,
  email,
  username,
  displayName,
  profilePicture,
  password,
}) => {
  return User.create({
    googleId,
    email,
    username,
    displayName,
    profilePicture,
    password,
  });
};

export const findUserByUsername = async (
  username
) => {
  return User.findOne({
    username,
  });
};