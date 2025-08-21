import { createReview } from "../models/reviewModel.js";

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

export { newReview };
