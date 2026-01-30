import slugify from "slugify";
import Blog from "../models/Blog.js";

export const createBlog = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const {
      title,
      content,
      metaTitle,
      metaDescription,
      featureImage,
      tags,
      categories,
      faq,
      internalLinks,
      externalLinks,
      status
    } = req.body;

    if (
      !title ||
      !content ||
      !metaTitle ||
      !metaDescription ||
      !featureImage
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Generate base SEO-friendly slug
    let baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true
    });

    let slug = baseSlug;
    let counter = 1;

    // Ensure slug uniqueness
    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const blog = new Blog({
      title,
      slug,
      content,
      metaTitle,
      metaDescription,
      featureImage,
      tags: tags || [],
      categories: categories || [],
      faq: faq || [],
      internalLinks: internalLinks || [],
      externalLinks: externalLinks || [],
      status: status || "draft",
      author: req.user.id
    });

    await blog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to create blog",
      error: error.message
    });
  }
};

// Add logic for getAllBlogs, updateBlog, deleteBlog here...