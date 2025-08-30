import express from "express";
import {
  createJob,
  getJobs,
  getJob,
  getJobByShortId,
  editJob,
  removeJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/", createJob);
router.get("/all", getJobs);
// Get a job by UUID
router.get("/id/:id", getJob);
// Get a job by short job_id
router.get("/jobid/:job_id", getJobByShortId);
// Update a job by UUID
router.put("/id/:id", editJob);
// Delete a job by UUID
router.delete("/id/:id", removeJob);

export default router;
