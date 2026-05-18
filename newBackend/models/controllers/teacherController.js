import Teacher from "../teacher/teacherModel.js";
import User from "../User.js"; //User model bhi import

const formatTeacherResponse = (teacher) => ({
  _id: teacher._id,
  name: teacher.userId?.name || teacher.name,
  email: teacher.userId?.email || teacher.email,
  photo: teacher.userId?.photo || teacher.photo,
  phone: teacher.phone,
  subject: teacher.subject,
  className: teacher.className || "",
  classes: teacher.classes,
  qualification: teacher.qualification || "",
  experience: teacher.experience,
  attendanceRate: teacher.attendanceRate,
});

// GET - Teacher by ID
export const getTeacherId = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      "userId",
      "name email photo role",
    ); //User se data lena

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
      "name email photo role",
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
    const {
      userId,
      phone,
      subject,
      classes,
      className,
      qualification,
      experience = "",
      email,
    } = req.body;

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

    //User ka name/email copy karo Teacher mein TOTAL 8 LINES
    const teacher = await Teacher.create({
      userId: user._id,
      name: user.name, // User se copy
      email: email || user.email, // User se copy
      photo: user.photo || "",
      phone,
      subject,
      classes,
      className,
      qualification,
      experience,
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

export const getTeachers = async (_req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate("userId", "name email photo role")
      .sort({ createdAt: -1 });

    res.json({
      data: teachers.map(formatTeacherResponse),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const { name, email, phone, subject, classes, className, qualification, experience, photo } = req.body;

    if (name !== undefined) teacher.name = name;
    if (email !== undefined) teacher.email = email;
    if (phone !== undefined) teacher.phone = phone;
    if (subject !== undefined) teacher.subject = subject;
    if (classes !== undefined) teacher.classes = classes;
    if (className !== undefined) teacher.className = className;
    if (qualification !== undefined) teacher.qualification = qualification;
    if (experience !== undefined) teacher.experience = experience;
    if (photo !== undefined) {
      teacher.photo = photo || "";
    }

    await teacher.save();

    const updatedTeacher = await Teacher.findById(teacher._id).populate(
      "userId",
      "name email photo role",
    );

    res.json({
      message: "Teacher updated successfully",
      data: formatTeacherResponse(updatedTeacher),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    await Teacher.findByIdAndDelete(req.params.id);

    res.json({ message: "Teacher deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
