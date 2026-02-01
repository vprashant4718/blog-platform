import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
    },

    metaTitle: {
      type: String,
      required: true,
    },

    metaDescription: {
      type: String,
      required: true,
    },

    featureImage: {
      type: String,
      required: true,
    },

    tags: {
      type: [String],
      default: [],
    },

    categories: {
      type: [String],
      default: [],
    },

    faq: [
      {
        question: String,
        answer: String,
      },
    ],

    internalLinks: [
      {
        title: String,
        url: String,
      },
    ],

    externalLinks: [
      {
        title: String,
        url: String,
      },
    ],

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    
    views: {
    type: Number,
    default: 0,
    }

  },
  { timestamps: true }
);

export default mongoose.model("Blog", blogSchema);
