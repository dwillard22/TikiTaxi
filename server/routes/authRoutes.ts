// src/routes/authRoutes.ts
import { Router } from "express";
import * as authController from "../controllers/authController";

const router = Router();

// POST /api/auth/google - Verify Google OAuth token
router.post("/auth/google", authController.verifyGoogleAuth);

// POST /api/auth/apple - Verify Apple OAuth token
router.post("/auth/apple", authController.verifyAppleAuth);

export default router;

