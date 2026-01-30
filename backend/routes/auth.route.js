import express from 'express';
import { login, register } from '../controllers/auth.controller.js';

const router = express.Router();

// Only 'Editor', 'Author', and 'Super Admin' can create blogs [cite: 35, 36]
router.post('/register', register);
router.post('/login', login);

export default router;