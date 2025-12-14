import { Schema, model, Document } from "mongoose";

// Define allowed status values
type RideStatus = "pending" | "accepted" | "completed";

export interface IRide extends Document {
  pickup: string;
  destination: string;
  phone: string;
  passengerName: string;
  passengerEmail: string;
  status: RideStatus;
  createdAt: Date;
  updatedAt: Date;
}

const RideSchema = new Schema<IRide>(
  {
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    phone: { type: String, required: true },
    passengerName: { type: String, required: true },
    passengerEmail: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "completed"], // restrict allowed values
      default: "pending",
      required: true,
    },
  },
  { timestamps: true }
);

// Ensure the IRide interface is applied to the Ride model
const Ride = model<IRide>("Ride", RideSchema);

export default Ride;
