
// LOGIN
import  User from "../models/User.js"


const loginUser = async (req,res)=>{

try{

const {email,password,role} = req.body;

const user = await User.findOne({email,role});

if(!user){
return res.status(404).json({
message:"User not found"
});
}

if(user.password !== password){
return res.status(401).json({
message:"Wrong password"
});
}

res.json({
message:"Login successful",
user
});



}catch(error){

res.status(500).json({
message:"Server error"
});

}

};
export default loginUser;