import Student from "../students/studentsModel.js";
import User from "../User.js" // User model imported 

// Filter
const buildFilter = ({ className, search }) => {
  const filter = {};
  if (className) {
    filter.className = className;
  }
  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }
  return filter;
};
// Shorting 
export const listStudents = async (req, res) => {
  try {
    const { sort } = req.query;
    const filter = buildFilter(req.query);
   let sortOption = {};

    if (sort === "roll") {
      sortOption = { rollNumber: 1 }; 
    } else if (sort === "name") {
      sortOption = { name: 1 };
    } else {
      sortOption = { className: 1, name: 1 }; // default
    }

    const students = await Student.find(filter)
      .select("-__v")
      .sort(sortOption)
      .lean();

    res.status(200).json({ success: true, data: students });
  } catch (error) {
    console.error("listStudents error:", error);
    res.status(500).json({ success: false, message: "Unable to load students" });
  }
};

// Create student
export const createStudent = async (req, res) => {
  try {
    const {
      name,
      rollNumber,
      roll,
      className,
      class: studentClass,
      phone,
      email,
      qualification,
      stream,
      totalFees,
      paidFees,
      userId,
    } = req.body;

    if (!name || !rollNumber) {
      return res.status(400).json({
        success: false,
        message: "name and rollNumber are required",
      });
    }

    const student = await Student.create({
      name,
      rollNumber,
      roll,
      className,
      class: studentClass,
      phone,
      email,
      qualification,
      stream,
      totalFees,
      paidFees,
      userId,
    });

    res.status(201).json({ success: true, data: student });
  } catch (error) {
    console.error("createStudent error:", error);
    res.status(500).json({ success: false, message: "Unable to create student" });
  }
};
// GET student by id
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).lean();
    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }
    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("getStudentById error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
// GET student by id
export const getStudentByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User id is required" });
    }

    const student = await Student.findOne({ userId }).lean();
    if (!student) {
      return res
        .status(404)
        .json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("getStudentByUserId error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
