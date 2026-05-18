// [ Register ] -  When user register account (Email , Password) by roles creates his profile into sperate files

import User from "../../User.js";
import Teacher from "../../teacher/teacherModel.js";
import Student from "../../students/studentsModel.js";
import bcrypt from "bcryptjs";

// Register
const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      roles,
      phone,
      subject,
      className,
      qualification,
      rollNumber,
      totalFees,
      paidFees,
    } = req.body;
    const normalizedRole = (role || roles || "student").toLowerCase();

    const cleanSubject = Array.isArray(subject)
      ? subject.map((s) => String(s).trim()).filter(Boolean).join(", ")
      : String(subject ?? "").trim();

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
      role: normalizedRole,
    });
    await user.save();

    // For Teacher
    if (normalizedRole === "teacher") {
      const teacher = await Teacher.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        phone: phone || "",
        subject: cleanSubject,
        qualification: qualification || "",
        className: className || "",
        experience: req.body.experience || "",
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        profile: {
          id: teacher._id,
          type: "teacher",
        },
      });
    }

    // For Student
    if (normalizedRole === "student") {
      const student = await Student.create({
        userId: user._id,
        name: user.name,
        email: user.email,
        rollNumber: rollNumber,
        className: className || "",
        phone: phone || "",
        qualification: qualification || "",
        totalFees: Number(totalFees) || 0,
        paidFees: Number(paidFees) || 0,
      });

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        profile: {
          id: student._id,
          type: "student",
        },
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
