import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: [
        "project",
        "blog",
        "certificate",
        "achievement",
        "video",
        "document",
      ],
      default: "project",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    summary: {
      type: String,
      default: "",
    },

    githubUrl: String,

    demoUrl: String,

    image: String,

    readme: {
      type: String,
      default: "",
    },

    technologies: [
      {
        type: String,
      },
    ],

    concepts: [
      {
        type: String,
      },
    ],

    tags: [
      {
        type: String,
      },
    ],
    questions: {
  type: [String],
  default: [],
},

    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Knowledge", knowledgeSchema);