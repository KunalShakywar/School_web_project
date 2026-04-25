import Teacher from "../teacher/Teachers.js";
import User from "../User.js"; //User model bhi import 

const formatTeacherResponse = (teacher) => ({
  _id: teacher._id,
  name: teacher.userId?.name || teacher.name,
  email: teacher.userId?.email || teacher.email,
  avatar: teacher.userId?.avatar || teacher.avatar,
  phone: teacher.phone,
  subject: teacher.subject || teacher.department,
  qualification: teacher.qualification || "",
  className: teacher.className,
  attendanceRate: teacher.attendanceRate,
  progressRate: teacher.progressRate,
});

// GET - Teacher by ID
export const getTeacherId = async (req, res) => {
  try {
    const teacher = await Teacher
      .findById(req.params.id)
      .populate('userId', 'name email avatar role'); //User se data lena

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ data: formatTeacherResponse(teacher) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTeacherByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const teacher = await Teacher.findOne({ userId }).populate(
      "userId",
      "name email avatar role"
    );

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({ data: formatTeacherResponse(teacher) });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// POST - Teacher create karo (register ke baad call hoga)
export const createTeacher = async (req, res) => {
  try {
    const { userId, phone, subject, className, qualification } = req.body;

    //Pehle User dhundo
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Already teacher ban chuka hai?
    const existingTeacher = await Teacher.findOne({ userId });
    if (existingTeacher) {
      return res.status(400).json({ message: "Teacher already exists" });
    }

    //User ka name/email copy karo Teacher mein
    const teacher = await Teacher.create({
      userId: user._id,
      name: user.name,   // User se copy
      email: user.email, // User se copy
      avatar: user.avatar || '',
      phone,
      subject,
      qualification,
      className,
    });

    res.status(201).json({
      message: "Teacher created successfully",
      teacher,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
