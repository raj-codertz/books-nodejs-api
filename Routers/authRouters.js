import { Router } from "express";
const router = Router()
import { register, login, logout } from "../Controllers/authController.js";
import {validateRegisterInput} from "../Middleware/validationMiddleware.js";

router.post('/register', validateRegisterInput, register)
router.post('/login', login)

export default router