// [ Register ] -  When user register account (Email , Password) by roles creates his profile into sperate files

import User from "../../User.js";
import Teacher from "../../teacher/Teachers.js"; // Teacher import karo
import Student from "../../students/Students.js";
import bcrypt from "bcryptjs";

// Register
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, subject, className, qualification } = req.body;

    const cleanSubjects = Array.isArray(subject)
      ? subject.filter((s) => s && trim() !== "")
      :[];

    // Email already exist karta hai?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user's
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
// For Tacher's
    if (role === "teacher") {
      await Teacher.create({
        userId: user._id,   // User se link 
        name: user.name,    // User se copy
        email: user.email,  // User se copy
        phone: phone || "",
        subject: cleanSubjects,
        qualification: qualification || "",
        className: className || "",
      });
    }
    // For Student's
if (role === "student") {
  const { rollNumber } = req.body;

  await Student.create({
    userId: user._id,        // User se link 
    name: user.name,         // User se copy
    email: user.email,       // User se copy
    rollNumber: rollNumber,
    className: className || "",
    phone: phone || "",
    qualification: qualification || "",
  });
}
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default registerUser;
