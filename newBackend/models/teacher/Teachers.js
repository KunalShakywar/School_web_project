// Yeh kaam kar raha hai User.js se FK aa raha hai 
import { Schema, model } from "mongoose";

const TeacherSchema = new Schema(
  {
    // photos ka baad mai dekhekhnge
    photo: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Why i use array there coz teacher can handle multiple subjects
    subject: [{
      type: Schema.Types.ObjectId,
      ref: "Subject"
    }],

    // Teacher can handle multiple classes store into array
    classes: [{
      type:Schema.Types.ObjectId,
      ref: "Class"
    }],

    qualification: String,

    phone: {
      type: String,
      match: /^[0-9]{10}$/
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
    },
  }, { timestamps: true, });

export default model("Teacher", TeacherSchema);
