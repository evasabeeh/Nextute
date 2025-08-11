import express from "express";
import { newReview } from "../controllers/reviewController.js";

const router = express.Router();

router.post("/reviews", newReview);

export default router;
