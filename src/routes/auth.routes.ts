import { Router } from "express";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post("/login", AuthController.login);
router.post("/register", AuthController.register);
router.post("/refresh_token", AuthController.refreshToken);
router.post("/validate", AuthController.validateOtp);
router.post("/resend_otp", AuthController.generateNewOtp);

export default router;
