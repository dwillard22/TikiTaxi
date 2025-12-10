// src/server.ts
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import rideRoutes from "./routes/rideRoutes"; // Import your routes
import authRoutes from "./routes/authRoutes"; // Import auth routes

dotenv.config();

const app: Application = express();

// Middleware
app.use(bodyParser.json());

// CORS middleware (for frontend-backend communication)
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

// API Routes
app.use("/api", rideRoutes);
app.use("/api", authRoutes);

// Simple health check endpoint
app.get("/", (req: Request, res: Response) => {
  res.send("TikiTaxi Backend Running!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
