import express from 'express';
import { login, logout, register } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Only 'Editor', 'Author', and 'Super Admin' can create blogs [cite: 35, 36]
router.post('/register', register);
router.post('/login', login);

router.post("/logout", logout);


router.get("/isUserLogin", verifyToken, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.user
  });
});


export default router;