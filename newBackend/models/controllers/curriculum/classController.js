import Class from "../../curriculum/classes/Classes.js";
import { getSocketIO } from "../../../config/socket.js";

// create classes
export const createClass = async (req,res) => {
    try{
        const {name,levelId,order} = req.body;
        
        const newClass = await Class.create({
            name,levelId,order,
        });
        res.status(201).json({
            success:true,
            message:"Class created",
            data: newClass
        });

        getSocketIO()?.emit("curriculum-updated", {
            type: "class-created",
            data: newClass,
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

// get all classes
export const getClasses = async (req, res) => {
  try {
    const classes = await Class.find()
      .populate("levelId", "name")
      .sort({ levelId: 1, order: 1, createdAt: 1 });

    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get classes by level
export const getClassesByLevel = async (req,res) => {
    try{
        const {levelId} = req.params;

        const classes = await Class.find({levelId})
        .sort({order: 1 });

         res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
        });
    }
}
