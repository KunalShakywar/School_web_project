import Exam from "../../examination/examination.js";

// create exam
export const createExam = async (req, res) => {
  try {
    const exam = await Exam.create(req.body);

    res.status(201).json(exam);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// getExam
export const getExam = async (req, res) => {
  try {
    const exams = await Exam.find();

    res.json(exams);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};