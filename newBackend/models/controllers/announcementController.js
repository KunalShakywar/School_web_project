import Announcement from "../announcements/announcementModel.js";
import { getSocketIO } from "../../config/socket.js";

const normalizeStringList = (value) => {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
};

const normalizeAnnouncementPayload = (body = {}) => {
  const dateValue = body.date ? new Date(body.date) : new Date();

  return {
    title: String(body.title || "").trim(),
    description: String(body.description || "").trim(),
    type: body.type === "news" ? "news" : "notice",
    classes: normalizeStringList(body.classes || body.audience),
    date: Number.isNaN(dateValue.getTime()) ? new Date() : dateValue,
    popup: body.popup === true || body.popup === "true",
    isPublished: body.isPublished !== false && body.isPublished !== "false",
  };
};

const buildFilter = (query = {}) => {
  const filter = {};

  if (query.type === "news" || query.type === "notice") {
    filter.type = query.type;
  }

  if (query.published === "true") {
    filter.isPublished = true;
  } else if (query.published === "false") {
    filter.isPublished = false;
  }

  return filter;
};

export const listAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find(buildFilter(req.query))
      .sort({ date: -1, createdAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    console.error("listAnnouncements error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to load announcements",
    });
  }
};

export const createAnnouncement = async (req, res) => {
  try {
    const payload = normalizeAnnouncementPayload(req.body);

    if (!payload.title || !payload.description) {
      return res.status(400).json({
        success: false,
        message: "title and description are required",
      });
    }

    const announcement = await Announcement.create(payload);

    getSocketIO()?.emit("announcements-updated", {
      action: "created",
      message: `New ${announcement.type} posted`,
      announcement,
    });

    res.status(201).json({ success: true, data: announcement });
  } catch (error) {
    console.error("createAnnouncement error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to create announcement",
    });
  }
};

export const updateAnnouncement = async (req, res) => {
  try {
    const payload = normalizeAnnouncementPayload(req.body);

    if (!payload.title || !payload.description) {
      return res.status(400).json({
        success: false,
        message: "title and description are required",
      });
    }

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      payload,
      { new: true, runValidators: true }
    ).lean();

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    getSocketIO()?.emit("announcements-updated", {
      action: "updated",
      message: `${announcement.type === "news" ? "News" : "Notice"} updated`,
      announcement,
    });

    res.status(200).json({ success: true, data: announcement });
  } catch (error) {
    console.error("updateAnnouncement error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to update announcement",
    });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id).lean();

    if (!announcement) {
      return res.status(404).json({
        success: false,
        message: "Announcement not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Announcement deleted successfully",
      data: announcement,
    });

    getSocketIO()?.emit("announcements-updated", {
      action: "deleted",
      message: `${announcement.type === "news" ? "News" : "Notice"} deleted`,
      announcement,
    });
  } catch (error) {
    console.error("deleteAnnouncement error:", error);
    res.status(500).json({
      success: false,
      message: "Unable to delete announcement",
    });
  }
};
