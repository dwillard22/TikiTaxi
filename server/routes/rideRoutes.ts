import { Router } from "express";
import Ride from "../models/Ride";
import { requireAuth, AuthRequest } from "../middleware/auth";

const router = Router();

/**
 * POST /api/rides
 * Create a new ride request
 */
router.post("/", async (req, res) => {
  try {
    const { pickup, destination, phone, passengerName, passengerEmail } =
      req.body;

    if (
      !pickup ||
      !destination ||
      !phone ||
      !passengerName ||
      !passengerEmail
    ) {
      return res.status(400).json({ message: "Missing ride info" });
    }

    const ride = await Ride.create({
      pickup,
      destination,
      phone,
      passengerName,
      passengerEmail,
    });

    res.status(201).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create ride" });
  }
});

/**
 * GET /api/rides
 * Fetch all pending rides
 */
router.get("/", async (_req, res) => {
  const rides = await Ride.find().sort({ createdAt: -1 });
  res.json(rides);
});

/**
 * DELETE /api/rides/:id
 * Delete ride once accepted
 */
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.json({ message: "Ride accepted and removed" });
  } catch {
    res.status(500).json({ message: "Failed to delete ride" });
  }
});

export default router;
