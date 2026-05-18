import {Schema, model} from "mongoose";

const enrollmentSchema = new Schema(

    {
        studentId: {
            type: Schema.Types.ObjectId,
            ref: "Student",
            required
        },

        classId: {
            type:Schema.Types.ObjectId,
            ref:"Class",
            required:true
        },

        rollNumber: {
            type: String,
            required: true,
        },

        session:{
            type: String,
            required: true
        },

        status:  {
            type: String,
            enum : ["active","inactive","promoted"],
            default: "active"
        },

        admissionDate: {
            type: Date,
            default: Date.now,
        },

    },{timestamps:true});

    export default model("Enrollment", enrollmentSchema);