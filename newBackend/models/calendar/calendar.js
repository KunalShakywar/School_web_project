import mongoose from "mongoose";

const academicSessionSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },

    startDate: Date,
    endDate: Date,

    isActive: {
        type:Boolean,
        default:false,
    }
});
export default mongoose.model("AcademicSession", academicSessionSchema);