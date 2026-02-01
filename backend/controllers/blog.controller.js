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

// GET /api/blogs/getAllBlogs
export const getAllBlogs = async (req, res) => {
  try {
    const { category, tag, author } = req.query;

    const query = { status: "published" };

    if (category) {
      query.categories = category;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (author) {
      query.author = author;
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/blogs/admin/getAllBlogs
export const getAllBlogsAdmin = async (req, res) => {
  try {
    const { category, tag, author, status } = req.query;

    const query = {}; 

    if (status) {
      query.status = status; // draft | published
    }

    if (category) {
      query.categories = category;
    }

    if (tag) {
      query.tags = { $in: [tag] };
    }

    if (author) {
      query.author = author;
    }

    const blogs = await Blog.find(query)
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET /api/blogs/admin/getAllBlogsById
export const getAllBlogsAdminById = async (req, res) => {
  try {
    const { id } = req.params;

    const blogs = await Blog.find({ _id: id })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getBlogBySlug = async (req, res) => {
  try {
    // Find blog by 'slug' field, not '_id'
    const blog = await Blog.findOne({ slug: req.params.slug, status: "published" }).populate('author', 'name');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// controllers/blog.controller.js
export const incrementBlogView = async (req, res) => {
  try {
    const { slug } = req.params;

    await Blog.findOneAndUpdate(
      { slug, status: "published" },
      { $inc: { views: 1 } }
    );

    res.status(200).json({ message: "View counted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//logic for  updateBlog, deleteBlog here...
//UPDATE BLOG
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//DELETE BLOG 
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};