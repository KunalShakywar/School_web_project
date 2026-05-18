import { Schema } from "mongoose"


const streamSchema = new Schema ( {
        type: String,
        enum: ["Science", "Commerce", "Arts", null], 
        required: true,
        default:null
    });

export default model("Stream", streamSchema);