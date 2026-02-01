import express from 'express';
import { createBlog, getBlogBySlug, getAllBlogs, getAllBlogsAdmin, incrementBlogView } from '../controllers/blog.controller.js';
import { verifyToken, checkRole } from '../middleware/auth.middleware.js';

const router = express.Router();

// Only 'Editor', 'Author', and 'Super Admin' can create blogs [cite: 35, 36]
router.post('/create', verifyToken, checkRole(['editor', 'author', 'superAdmin']), createBlog);

router.get('/getAllBlogs', getAllBlogs);

// admin (protected)
router.get( "/admin/getAllBlogs", verifyToken, checkRole(["editor", "author", "superAdmin"]), getAllBlogsAdmin );

router.get('/:slug', getBlogBySlug);
// increase view of the blog  when new view occurs 
router.patch("/view/:slug", incrementBlogView);


export default router;