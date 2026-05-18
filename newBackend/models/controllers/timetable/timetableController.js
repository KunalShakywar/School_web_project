import Timetable from "../../timetable/timetableModel.js";

export const createTimetable = async (req, res) => {
  try {
    const { className, periods } = req.body;

    if (!className || !Array.isArray(periods)) {
      return res.status(400).json({
        success: false,
        message: "className and periods are required",
      });
    }

    const timetable = await Timetable.create({
      className,
      periods,
    });

    return res.status(201).json({
      success: true,
      data: timetable,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTimetables = async (req, res) => {
  try {
    const timetables = await Timetable.find().sort({ className: 1 }).lean();

    return res.status(200).json({
      success: true,
      data: timetables,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
