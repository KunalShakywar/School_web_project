import Level from "../../curriculum/Level.js"
import { getSocketIO } from "../../../config/socket.js";

export const createLevel = async (req, res) =>{
    try{
        const {name} = req.body;

        const level = await Level.create({
            name,
        });

        res.status(201).json({
            success:true,
            message:"Level created",
            data:level,
        });

        getSocketIO()?.emit("curriculum-updated", {
            type: "level-created",
            data: level,
        });
    } catch (error){
        res.status(500).json({
            success:false,
            message: error.message,
        });
    }
};

// Get all level

export const getLevel = async (req,res) => {
    try{
        const levels = await Level.find();

        res.status(200).json({
            success:true,
            data:levels,
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message,
        });
    }
};
