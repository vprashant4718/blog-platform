import express from 'express';
import { createBlog, getBlogBySlug, getAllBlogs } from '../controllers/blog.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Only 'Editor', 'Author', and 'Super Admin' can create blogs [cite: 35, 36]
router.post('/create', verifyToken, checkRole(['editor', 'author', 'superAdmin']), createBlog);
router.get('/getAllBlogs', getAllBlogs);
router.get('/:slug', getBlogBySlug);
export default router;