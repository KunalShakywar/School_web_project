import User from "../../User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation of user
    if (!email || !password) {
      return res.status(400).json({ message: "Sab fields bharo" });
    }

    // Find user in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Passwored maching
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Token creator
    const jwtSecret = process.env.JWT_SECRET || "school_dev_secret";
    if (!process.env.JWT_SECRET) {
      console.warn(
        "JWT_SECRET is unset; using a fallback secret suitable for local development only."
      );
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      jwtSecret,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
});

  } catch (error) {
    console.error("Login controller error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default loginUser;
