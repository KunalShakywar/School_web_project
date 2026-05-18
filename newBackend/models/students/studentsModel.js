// Student details
import  { Schema, model } from "mongoose";

// name,dob,gender,phone,email,parents,classId,rollnumber,userId,admission_date
const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    rollNumber: {
      type: String,
      required: true,
      unique: true,
    },

    // UI aur controllers className use kar rahe hain
    className: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      match: /^[0-9]{10}$/,
      unique: true,
      sparse: true
    },

    email: {
      type: String,
      lowercase:true,
      trim: true,
      sparse: true 
    },

    qualification: {
      type: String,
      default: "",
    },

    totalFees: {
      type: Number,
      default: 0,
    },

    paidFees: {
      type: Number,
      default: 0,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Legacy/optional school fields
    dob: {
      type: Date,
      default: null,
    },

    gender: {
      type: String,
      enum: ["M", "F", "O"],
      default: undefined,
    },

    parents: {
      father_name: { type: String, default: "" },
      mother_name: { type: String, default: "" },
      parent_phone: { type: String, default: "" },
    },

    address: {
      street: String,
      city: String,
      state: String,
      pincode: {
        type: String,
        default: "",
      },
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      default: null,
    },

    admission_date: {
      type: Date,
      default: Date.now
    }
  },

  {
    timestamps: true,
  }
);

export default model("Student", studentSchema);
