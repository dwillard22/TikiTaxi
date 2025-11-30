// src/controllers/rideController.ts
import { Request, Response } from "express";
import { Ride } from "../models/Ride"; // Import the interface

// Handles the POST /api/rides logic
export const createRide = (
  req: Request<
    {},
    {},
    Omit<Ride, "rideId" | "driverId" | "status" | "createdAt" | "fare">
  >,
  res: Response
) => {
  // req.body is strongly typed based on the Omit utility
  const { pickupLocation, dropoffLocation, userId } = req.body;

  // 1. **Input Validation:** TypeScript helps here, but run-time checks are still needed.
  if (!pickupLocation || !dropoffLocation || !userId) {
    return res.status(400).json({ message: "Missing required ride fields." });
  }

  // 2. **Database Logic:** Save the request, search for drivers...
  // e.g., const newRide: Ride = await db.createRide(data);

  // 3. **Response:**
  // res.status(201).json(newRide);
  res.status(201).json({ message: "Ride request received!" });
};

export const getRideStatus = (req: Request<{ id: string }>, res: Response) => {
  // req.params.id is guaranteed to be a string
  const rideId = req.params.id;
  // ... Logic to fetch ride status from DB
  res.status(200).json({ id: rideId, status: "en route" });
};
