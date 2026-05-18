import Teacherclass from "../../teacher/teacherClassModel.js";

export const assignTeacher = async (req, res) => {
  try {
    const { teacherId, classId, sectionId, subjectId, streamId } = req.body;

    if (!teacherId || !classId || !sectionId || !subjectId) {
      return res.status(400).json({
        success: false,
        message: "teacherId, classId, sectionId, and subjectId are required",
      });
    }

    const data = await Teacherclass.create({
      teacherId,
      classId,
      sectionId,
      subjectId,
      streamId: streamId || null,
    });

    res.status(201).json({
      success: true,
      message: "Teacher assigned successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAssignments = async (_req, res) => {
  try {
    const assignments = await Teacherclass.find()
      .populate("teacherId")
      .populate("classId")
      .populate("sectionId")
      .populate("subjectId")
      .populate("streamId")
      .sort({ _id: -1 })
      .lean();

    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getByTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const assignments = await Teacherclass.find({ teacherId: id })
      .populate("teacherId")
      .populate("classId")
      .populate("sectionId")
      .populate("subjectId")
      .populate("streamId")
      .lean();

    res.status(200).json({ success: true, data: assignments });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteAssignment = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAssignment = await Teacherclass.findByIdAndDelete(id);

    if (!deletedAssignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully",
      data: deletedAssignment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
