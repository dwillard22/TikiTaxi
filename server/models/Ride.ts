// src/models/Ride.ts
export interface Ride {
  rideId: string;
  userId: string;
  driverId: string | null;
  pickupLocation: { lat: number; lng: number; address: string };
  dropoffLocation: { lat: number; lng: number; address: string };
  status: "pending" | "matched" | "en route" | "complete" | "cancelled";
  fare: number;
  createdAt: Date;
}
