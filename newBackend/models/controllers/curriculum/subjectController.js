import Subject from "../../classmodels/subjects/subjectsModel.js";
import { getSocketIO } from "../../../config/socket.js";

export const createSubject = async (req, res) => {
  try {
    const {
      name,
      code,
      classId,
      order = 0,
      resourcesUrl = "",
      syllabusUrl = "",
    } = req.body;

    if (!name || !classId) {
      return res.status(400).json({
        success: false,
        message: "name and classId are required",
      });
    }

    const subject = await Subject.create({
      name,
      code,
      classId,
      order,
      resourcesUrl,
      syllabusUrl,
    });

    res.status(201).json({
      success: true,
      message: "Subject created",
      data: subject,
    });

    getSocketIO()?.emit("curriculum-updated", {
      type: "subject-created",
      data: subject,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find()
      .populate("classId", "name levelId order")
      .sort({ classId: 1, order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getSubjectsByClass = async (req, res) => {
  try {
    const { classId } = req.params;

    const subjects = await Subject.find({ classId }).sort({ order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: subjects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
