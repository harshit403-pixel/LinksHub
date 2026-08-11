import GithubConnection from "../../models/githubConnection.model.js";

export const findConnectionByGithubId = (
  githubId
) =>
  GithubConnection.findOne({
    githubId,
  });

export const upsertConnectionByUser = (
  userId,
  connectionData
) =>
  GithubConnection.findOneAndUpdate(
    {
      user: userId,
    },
    connectionData,
    {
      upsert: true,
      new: true,
    }
  );

export const findConnectionByUser = (
  userId
) =>
  GithubConnection.findOne({
    user: userId,
  });

export const deleteConnectionByUser = (
  userId
) =>
  GithubConnection.findOneAndDelete({
    user: userId,
  });

export const deleteConnectionDocument = (
  connection
) => connection.deleteOne();
