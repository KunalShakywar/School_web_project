// Yeh kaam kar raha hai User.js se FK aa raha hai 
import { Schema, model } from "mongoose";

const TeacherSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // Frontend text subject bhej raha hai, isliye string rakh rahe hain
    subject: {
      type: String,
      default: "",
      trim: true,
    },

    // UI me className use ho raha hai
    className: {
      type: String,
      default: "",
      trim: true,
    },

    // Optional legacy support
    classes: [{
      type: String,
      trim: true,
    }],

    qualification: String,
    experience: String,

    phone: {
      type: String,
      match: /^[0-9]{10}$|^\+91[0-9]{10}$/,
    },

    email: {
      type: String,
      lowercase: true,
      trim: true
    },

    // Teacher attedance collect
    attendanceRate: {
  type: Number,
  default: 0,
  min: 0,
  max: 100
}
  }, { timestamps: true, });

export default model("Teacher", TeacherSchema);
