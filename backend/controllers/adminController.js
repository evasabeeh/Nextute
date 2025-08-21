import { getAdminByEmail } from "../models/adminModel.js";

const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await getAdminByEmail(email);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (admin.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", admin });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { adminLogin };
