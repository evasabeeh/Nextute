import prisma from "../db/index.js";

const createReview = async ({
  email,
  reviewerType,
  rating,
  title,
  comment,
}) => {
  return await prisma.review.create({
    data: {
      email,
      reviewerType,
      rating,
      title,
      comment,
    },
  });
};

export { createReview };
