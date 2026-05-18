import AcademicCalendar from "../../calendar/academicCalander.js";
import { getSocketIO } from "../../../config/socket.js";

export const listAcademicCalendarEvents = async (req, res) => {
  try {
    const { month, year } = req.query;

    const query = { isPublic: true };

    if (month && year) {
      const monthIndex = Number(month) - 1;
      const yearNumber = Number(year);

      if (!Number.isNaN(monthIndex) && !Number.isNaN(yearNumber)) {
        const rangeStart = new Date(yearNumber, monthIndex, 1);
        const rangeEnd = new Date(yearNumber, monthIndex + 1, 0, 23, 59, 59, 999);

        query.$or = [
          { startDate: { $lte: rangeEnd, $gte: rangeStart } },
          { endDate: { $gte: rangeStart, $lte: rangeEnd } },
          { startDate: { $lte: rangeStart }, endDate: { $gte: rangeEnd } },
        ];
      }
    }

    const events = await AcademicCalendar.find(query)
      .populate("session", "name startDate endDate isActive")
      .sort({ startDate: 1, createdAt: 1 })
      .lean();

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createAcademicCalendarEvent = async (req, res) => {
  try {
    const {
      title,
      description = "",
      startDate,
      endDate,
      type,
      session,
      isPublic = true,
    } = req.body;

    if (!title || !startDate || !endDate || !type) {
      return res.status(400).json({
        success: false,
        message: "title, startDate, endDate, and type are required",
      });
    }

    const event = await AcademicCalendar.create({
      title,
      description,
      startDate,
      endDate,
      type,
      session,
      isPublic,
    });

    res.status(201).json({
      success: true,
      message: "Calendar event created",
      data: event,
    });

    getSocketIO()?.emit("calendar-updated", {
      action: "created",
      event,
      message: `New calendar event created: ${event.title}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateAcademicCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await AcademicCalendar.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Calendar event updated",
      data: updatedEvent,
    });

    getSocketIO()?.emit("calendar-updated", {
      action: "updated",
      event: updatedEvent,
      message: `Calendar event updated: ${updatedEvent.title}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAcademicCalendarEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEvent = await AcademicCalendar.findByIdAndDelete(id);

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Calendar event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Calendar event deleted",
      data: deletedEvent,
    });

    getSocketIO()?.emit("calendar-updated", {
      action: "deleted",
      event: deletedEvent,
      message: `Calendar event deleted: ${deletedEvent.title}`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
