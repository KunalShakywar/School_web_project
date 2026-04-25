import { Schema, model } from "mongoose"; 


// User ke liye yahan Admin , Parent , teacher, Staff sab roles ke according rahenge

const userSchema = new Schema({
// Name
    name: {
        type:String,
        required:[true,'is required field'],
    },
// email
    email: {
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
// Password
    password:{
        type:String,
        required:true,
      
    },
// Roles
    role: {
        type:String,
        enum: ["admin","student","teacher","parent"],
        default: "student",
    },

});

export default model("User",userSchema)