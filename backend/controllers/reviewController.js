import { createReview, getAllReviews } from "../models/reviewModel.js";

const newReview = async (req, res) => {
  const { email, reviewerType, rating, title, comment } = req.body;

  try {
    const newReview = await createReview({
      email,
      reviewerType,
      rating,
      title,
      comment,
    });
    res.status(201).json({ status: "success", data: newReview });
  } catch (error) {
    console.error("Error creating review:", error);
    res
      .status(500)
      .json({ status: "error", message: "Failed to create review." });
  }
};


const fetchAllReviews = async (req, res) => {
  try {
    const reviews = await getAllReviews();
    res.status(200).json({ status: "success", data: reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ status: "error", message: "Failed to fetch reviews." });
  }
};

export { newReview, fetchAllReviews };
