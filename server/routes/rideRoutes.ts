// src/routes/rideRoutes.ts
import { Router } from "express";
import * as rideController from "../controllers/rideController";

const router = Router();

// POST /api/rides - Creates a new ride request
router.post("/rides", rideController.createRide);

// GET /api/rides/:id/status - Fetches current ride status
router.get("/rides/:id/status", rideController.getRideStatus);

export default router;
