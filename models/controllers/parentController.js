
import User from "../User.js";

const getParentId = async (req, res) => {
  try {
    const id = req.params.id;

    const parentId = await User.findById(id);

    if (!parentId) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json(parentId);

  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
  
};

export default getParentId;
