
import User from "../models/User.js";

const getStudentId = async (req, res) => {
  try {
    const id = req.params.id;

    const teacherId = await User.findById(id);

    if (!teacherId) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(teacherId);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  
};

export default getStudentId;