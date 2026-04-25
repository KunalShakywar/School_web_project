import { Schema, model } from "mongoose";

const curriculumSubjectSchema = new Schema(
  {
    name: { type: String, required: true },
    units: [{ type: String }],
    assessment: { type: String, default: "" },
    resources: [{ type: String }],
    notes: { type: String, default: "" },
  },
  { _id: false }
);

const curriculumSchema = new Schema(
  {
    className: { type: String, required: true, trim: true },
    session: { type: String, default: "2025-26", trim: true },
    description: { type: String, default: "", trim: true },
    coordinator: { type: String, default: "", trim: true },
    examPattern: { type: String, default: "", trim: true },
    subjects: { type: [curriculumSubjectSchema], default: [] },
  },
  {
    timestamps: true,
  }
);

export default model("Curriculum", curriculumSchema);
