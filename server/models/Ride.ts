import { Schema, model, Document } from "mongoose";

export interface IRide extends Document {
  pickup: string;
  destination: string;
  phone: string;
  passengerName: string;
  passengerEmail: string;
  createdAt: Date;
}

const RideSchema = new Schema<IRide>(
  {
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    phone: { type: String, required: true },
    passengerName: { type: String, required: true },
    passengerEmail: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IRide>("Ride", RideSchema);
