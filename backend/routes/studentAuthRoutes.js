import express from "express";
import studentAuth from "../middlewares/studentAuthMiddleware.js";
import {
  signup,
  verifyCode,
  login,
  getStudentProfile,
  logout,
  resendVerificationCode,
  deleteStudent,
  fetchAllStudents,
} from "../controllers/studentAuthController.js";
import { validateEmailDomain } from "../middlewares/emailValidationMiddleware.js";

const router = express.Router();


router.get("/all", fetchAllStudents);
router.get("/profile", studentAuth, getStudentProfile);

router.post("/signup", validateEmailDomain, signup);
router.post("/verify", validateEmailDomain, verifyCode);
router.post("/resend-verification", resendVerificationCode);
router.post("/auth/login", login);
router.post("/logout", studentAuth, logout);

router.delete("/auth/delete", studentAuth, deleteStudent);

export default router;
