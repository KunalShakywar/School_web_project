// Router ka main purpose URL define krna h

import { Router } from 'express';
const router = Router();
// This controller using for Login,and Registration

import User from "../models/User.js";
import registerUser from "../models/controllers/auth/registerController.js";
import loginUser from "../models/controllers/auth/loginController.js";
import { requireAuth } from "../middleware/authMiddleware.js";

// Post register
router.post('/register',registerUser);

// Post Login

router.post('/login',loginUser);
router.get("/me", requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password").lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Auth me route error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
