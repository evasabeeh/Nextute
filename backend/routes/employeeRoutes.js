import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  generateQRCode,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/members", getEmployees);
router.get("/member/:certificateId", getEmployee);

router.post("/member/new", createEmployee);
router.post("/member/:employeeId/generate-qr", generateQRCode);

export default router;
