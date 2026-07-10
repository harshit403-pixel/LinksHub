import mongoose from "mongoose";

const githubConnectionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    githubId: {
      type: String,
      required: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "",
    },

    accessToken: {
      type: String,
      required: true,
    },

    connectedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "GithubConnection",
  githubConnectionSchema
);