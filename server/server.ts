// src/server.ts
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import rideRoutes from "./routes/rideRoutes"; // Import your routes

dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use("/api", rideRoutes);

// Simple health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("TikiTaxi Backend Running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
