// Router ka main purpose URL define krna 

import { Router } from 'express';
const router = Router();
// This controller using for Login,and Registration

import registerUser from "../controllers/registerController.js";
import loginUser from '../controllers/loginController.js';

// Post register
router.post('/register',registerUser);

// Post Login

router.post('/login',loginUser);



export default router;
