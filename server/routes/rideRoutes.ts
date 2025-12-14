import { Router } from "express";
import Ride from "../models/Ride";

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
      status: "pending", // Corrected field name
    });

    res.status(201).json(ride);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create ride" });
  }
});

/**
 * GET /api/rides
 * Fetch all rides
 */
router.get("/", async (_req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.json(rides);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch rides" });
  }
});

/**
 * DELETE /api/rides/:id
 * Delete a ride by its ID (e.g., when accepted)
 */
router.delete("/:id", async (req, res) => {
  try {
    const ride = await Ride.findByIdAndDelete(req.params.id);

    if (!ride) {
      return res.status(404).json({ message: "Ride not found" });
    }

    res.json({ message: "Ride deleted", ride });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete ride" });
  }
});

export default router;
