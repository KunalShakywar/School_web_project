// Student details
import  { Schema, model } from "mongoose";

// name,dob,gender,phone,email,parents,classId,rollnumber,userId,admission_date
const studentSchema = new Schema(
  {

    name: {
      type: String,
      required: true,
    },

    dob: {
      type: Date, // fixed becouse according to documents
      required: true,
    },

    gender: {
      type: String,
      enum: ["M", "F", "O"], // No questions about other gender
      required: true,
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


parents: {
  father_name: { type: String, default: "" },
  mother_name: { type: String, default: "" },
  parent_phone: { type: String, default: "" }
},

    address: {
      street: String,
      city: String,
      state: String,
      pincode: {
        type: String,
        match: /^[1-9][0-9]{5}$/,
        required: true
      }
    },

    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class", // class model se linked
      required: true
    },

    rollNumber: {
      type: String,  // unique by school 
      required: true,
      unique: true,
    },

    // Foreign key Kis liye role based auth ke liye (student,parents,staff,teacher,admin)
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User", // User.js model se linked
      required: true
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
