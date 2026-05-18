import { Schema, model } from "mongoose";

// name,section,stream,teacherId

const classSchema = new Schema({

    name: {
        type: String,
        required: true,
        unique: true
    },


  

    teacherId: {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
        required: true
    }
});

export default model("Class", classSchema);
