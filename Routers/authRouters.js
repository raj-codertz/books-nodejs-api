import { Router } from "express";
const router = Router()
import { register, login, logout } from "../Controllers/authController.js";
import {validateLoginInput, validateRegisterInput} from "../Middleware/validationMiddleware.js";

// user urls endpoints
router.post('/register', validateRegisterInput, register)
router.post('/login',validateLoginInput, login)
router.get('/logout', logout)

export default router