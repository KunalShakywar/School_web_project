import { Schema, model } from "mongoose";

const subjectSchema = new Schema({
    name: {
        type:String,
        required:true,
        unique:true
    },

    code: {
        type: String,
        unique:true
    },

    classId: {
        type: Schema.Types.ObjectId,
        ref: "Class",
        required: true,
    },

    order: {
        type: Number,
        default: 0,
    },

    resourcesUrl: {
        type: String,
        default: "",
    },

    syllabusUrl: {
        type: String,
        default: "",
    },

},{timestamps:true});

export default model("Subject", subjectSchema);
