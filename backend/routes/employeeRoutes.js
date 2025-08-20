import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  generateQRCode,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/members", getEmployees);
router.get("/member/:certificateNo", getEmployee);

router.post("/member/new", createEmployee);
router.post("/member/:employeeIdNo/generate-qr", generateQRCode);

export default router;
