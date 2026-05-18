import Staff from "../staff/staffModel.js";

const normalizeStaffPayload = (body = {}) => ({
  name: String(body.name || "").trim(),
  role: String(body.role || "Staff").trim() || "Staff",
  department: String(body.department || "").trim(),
  qualification: String(body.qualification || "").trim(),
  email: String(body.email || "").trim().toLowerCase(),
  phone: String(body.phone || "").trim(),
  photo: String(body.photo || "").trim(),
});

export const listStaff = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};

    if (search) {
      const regex = { $regex: String(search).trim(), $options: "i" };
      filter.$or = [
        { name: regex },
        { role: regex },
        { department: regex },
        { qualification: regex },
        { email: regex },
        { phone: regex },
      ];
    }

    const staff = await Staff.find(filter).sort({ createdAt: -1 }).lean();
    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    console.error("listStaff error:", error);
    res.status(500).json({ success: false, message: "Unable to load staff" });
  }
};

export const createStaff = async (req, res) => {
  try {
    const payload = normalizeStaffPayload(req.body);

    if (!payload.name) {
      return res.status(400).json({
        success: false,
        message: "name is required",
      });
    }

    const staff = await Staff.create(payload);
    res.status(201).json({ success: true, data: staff });
  } catch (error) {
    console.error("createStaff error:", error);
    res.status(500).json({ success: false, message: "Unable to create staff" });
  }
};

export const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).lean();

    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    console.error("getStaffById error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateStaff = async (req, res) => {
  try {
    const payload = normalizeStaffPayload(req.body);
    const staff = await Staff.findById(req.params.id);

    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    if (payload.name) staff.name = payload.name;
    if (payload.role) staff.role = payload.role;
    if (payload.department !== undefined) staff.department = payload.department;
    if (payload.qualification !== undefined) staff.qualification = payload.qualification;
    if (payload.email !== undefined) staff.email = payload.email;
    if (payload.phone !== undefined) staff.phone = payload.phone;
    if (payload.photo !== undefined) staff.photo = payload.photo;

    await staff.save();

    res.status(200).json({ success: true, data: staff });
  } catch (error) {
    console.error("updateStaff error:", error);
    res.status(500).json({ success: false, message: "Unable to update staff" });
  }
};

export const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id).lean();

    if (!staff) {
      return res.status(404).json({ success: false, message: "Staff not found" });
    }

    res.status(200).json({ success: true, message: "Staff deleted successfully", data: staff });
  } catch (error) {
    console.error("deleteStaff error:", error);
    res.status(500).json({ success: false, message: "Unable to delete staff" });
  }
};
