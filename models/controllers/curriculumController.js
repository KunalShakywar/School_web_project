import Curriculum from "../curriculum/Curriculum.js";

const normalizeList = (value) => {
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

const normalizeSubject = (subject) => ({
  name: subject?.name || subject?.subject || subject?.title || "",
  units: normalizeList(subject?.units || subject?.topics || subject?.chapters),
  assessment: subject?.assessment || subject?.evaluation || "",
  resources: normalizeList(subject?.resources),
  notes: subject?.notes || subject?.remarks || "",
});

const normalizeCurriculumItem = (item) => ({
  className: item?.className || item?.class || item?.title || "",
  session: item?.session || item?.academicYear || item?.year || "2025-26",
  description: item?.description || item?.overview || "",
  coordinator: item?.coordinator || item?.teacher || item?.owner || "",
  examPattern: item?.examPattern || item?.pattern || "",
  subjects: Array.isArray(item?.subjects)
    ? item.subjects.map(normalizeSubject).filter((subject) => subject.name)
    : [],
});

export const getCurriculum = async (req, res) => {
  try {
    const curriculum = await Curriculum.find()
      .sort({ className: 1, session: -1, updatedAt: -1 })
      .lean();

    res.status(200).json({ success: true, data: curriculum });
  } catch (error) {
    console.error("getCurriculum error:", error);
    res.status(500).json({ success: false, message: "Unable to load curriculum" });
  }
};

export const replaceCurriculum = async (req, res) => {
  try {
    const payload = Array.isArray(req.body) ? req.body : req.body?.curriculum;

    if (!Array.isArray(payload)) {
      return res.status(400).json({
        success: false,
        message: "Curriculum payload must be an array",
      });
    }

    const normalized = payload
      .map(normalizeCurriculumItem)
      .filter((item) => item.className);

    await Curriculum.deleteMany({});

    if (normalized.length > 0) {
      await Curriculum.insertMany(normalized);
    }

    const saved = await Curriculum.find()
      .sort({ className: 1, session: -1, updatedAt: -1 })
      .lean();

    res.status(200).json({
      success: true,
      message: "Curriculum updated successfully",
      data: saved,
    });
  } catch (error) {
    console.error("replaceCurriculum error:", error);
    res.status(500).json({ success: false, message: "Unable to save curriculum" });
  }
};
