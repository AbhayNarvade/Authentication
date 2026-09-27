import { Router } from "express";
import { loginValidation, registerValidation } from "../validator/auth.validator.js";
import validate from "../middleware/validator.js";
import { registerUser ,loginUser ,refresh ,getme} from "../controller/auth.controller.js"
import { authenticate } from "../middleware/auth.middleware.js";
const router = Router();



// @POST /api/auth/register
router.post("/register", registerValidation, validate, registerUser)


// @POST /api/auth/login
router.post("/login", loginValidation, validate, loginUser)


// @POST /api/auth/refresh
router.post("/refresh", refresh)

// @POST /api/auth/refresh
router.get("/me",authenticate, getme)

export default router;
