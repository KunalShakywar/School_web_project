import mongoose from "mongoose";


const classSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    levelId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Level",
        required:true,
    },

    order: {
        type:Number,
        required:true,
    },
},{timestamps:true});
const Class = mongoose.model("Class", classSchema);
export default Class;