import express from "express";
import {
  allUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken, checkRole } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/allUsers",
  verifyToken,
  checkRole(["superAdmin"]),
  allUsers
);

router.patch(
  "/update/:id",
  verifyToken,
  checkRole(["superAdmin"]),
  updateUserRole
);

router.delete(
  "/delete/:id",
  verifyToken,
  checkRole(["superAdmin"]),
  deleteUser
);

export default router;
