import Blog from "../models/blog.js";

export const createBlog = async (req, res) => {
    try {
        const newBlog = new Blog({ ...req.body, author: req.user.id });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Add logic for getAllBlogs, updateBlog, deleteBlog here...