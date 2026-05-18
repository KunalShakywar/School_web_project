import { model, Schema } from "mongoose";

const sectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "E"]
  },

  classId: {
    type: Schema.Types.ObjectId,
    ref: "Class",
    required: true
  }
});

export default model("Section", sectionSchema);