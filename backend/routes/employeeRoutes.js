import express from "express";
import { createEmployee, getEmployees, getEmployee, editEmployee, deleteEmployee } from "../controllers/employeeController.js";

const router = express.Router();

router.post("/", createEmployee);
router.get("/members", getEmployees);

router.get("/member/:certificateNo", getEmployee); // Changed from :certificateId to :certificateNo
// Edit member by certificateNo
router.put("/member/:certificateNo", editEmployee);
// Delete member by certificateNo
router.delete("/member/:certificateNo", deleteEmployee);


export default router;
