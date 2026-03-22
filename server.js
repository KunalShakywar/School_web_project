import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
const app = express();
// Routes import krne ke liye
import authRoute from './routes/authRoute.js';
import studentRoute from './routes/student/studentRoute.js'
import teacherRoute from './routes/teacher/teacherRoute.js'
app.use(cors())
app.use(json());
// Login,and Register (NO hasing Passowrd)
app.use("/api/auth",authRoute);

// student Profile
app.use("/api/student",studentRoute);
// teacher Profile
app.use("/api/teacher",teacherRoute);


connect("mongodb://127.0.0.1:27017/schooldb")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));


// Yahan Routes update krna nahi bhulna hai
app.listen(5000, "0.0.0.0", () => {
  console.log("Server running on port 5000");
});















