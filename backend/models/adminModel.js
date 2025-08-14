import prisma from "../db/index.js";

const getAdminByEmail = async (email) => {
  try {
    return await prisma.Admin.findUnique({
      where: { email },
    });
  } catch (error) {
    throw new Error("Error fetching admin");
  }
};

export { getAdminByEmail };
