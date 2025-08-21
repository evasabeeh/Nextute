import express from "express";
import {
  createEmployee,
  getEmployees,
  getEmployee,
  
} from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/members", getEmployees);
router.get("/member/:certificateNo", getEmployee); // Changed from :certificateId to :certificateNo


export default router;
