// It is for multiple schools but wait..wait.. wiat.. 

import mongoose, { Schema, model } from "mongoose"; 

const schoolSchema = new mongoose.Schema({
    name:String,
    address: String,
    code: String // unique school identifier
})

export default model("School", schoolSchema);