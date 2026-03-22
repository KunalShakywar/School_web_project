
import User from "../models/User.js"


// Register
const registerUser = async (req,res) => {

    try{
        const {name,email,password,role} = req.body;

        const user = new User ({
            name,
            email,
            password,
            role
        });
    await user.save();

    res.json({
        message:"User registered",
    user
    });

    }catch(error){
        res.status(500).json({
            message:"Server error"
        });
    }
};

export default registerUser;
