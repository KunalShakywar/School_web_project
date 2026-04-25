// tHERE IS NO PROBLEM 
import { Schema, model } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNumber: {
      type: String,
      required: true,
    },
    className: String,
    phone: String,
    email: String,
    qualification: String,
    stream: String,
    totalFees: {
      type: Number,
      default: 0,
    },
    paidFees: {
      type: Number,
      default: 0,
    },
  // Foreign key
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required:true,
     
    },
  },
  {
    timestamps: true,
  }
);

export default model("Student", studentSchema);
