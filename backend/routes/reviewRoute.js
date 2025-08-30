import express from "express";
import { newReview, fetchAllReviews } from "../controllers/reviewController.js";

const router = express.Router();


router.get("/reviews", fetchAllReviews);
router.post("/reviews", newReview);

export default router;
