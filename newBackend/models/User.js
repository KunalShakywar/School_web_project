import { Schema, model } from "mongoose";


// User ke liye yahan Admin , Parent , teacher, Staff sab roles ke according rahenge

const userSchema = new Schema({

    // Name
    name: {
        type: String,
        required: [true, 'is required field'],
    },

    // Phone number
    phone: {
        type: String,
        match: /^[0-9]{10}$/,
        unique: true,
        sparse: true
    },

    // Email address
    email: {
        type: String,
        lowercase: true,
        trim: true,
        sparse: true
    },

    // Password
    password: {
        type: String,
        required: true,
        minlength: 12
    },

    // Roles
    role: {
        type: String,
        enum: ["admin", "student", "teacher", "parent"],
        default: "student",
    },
});

export default model("User", userSchema)