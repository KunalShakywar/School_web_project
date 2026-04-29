import {Schema, model} from "mongoose";

// name,section,stream,teacherId

const classSchema = new schema({

    name: {
        type: String,
        required: true,
        unique: true
    },

    section: {
        type: String,
        required: true,
        enum: ["A", "B", "C", "D", "E"] // Class ke sections
    },

    stream: {
        type: String,
        enum: ["Science", "Commerce", "Arts", null], // Stream optional hai, null allowed hai
        required: true,
        default:null
    },

    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
});

export default model("Class", classSchema);