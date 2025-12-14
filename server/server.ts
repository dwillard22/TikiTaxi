import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const JWT_SECRET = process.env.JWT_SECRET!; // your own JWT secret
const oauthClient = new OAuth2Client(CLIENT_ID);

// allow your front-end origin
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/api/auth/google", async (req, res) => {
  const { idToken, accessToken } = req.body;
  if (!idToken && !accessToken)
    return res.status(400).json({ error: "No token provided" });

  try {
    let payload: any = null;

    if (idToken) {
      // Preferred: verify the ID token
      const ticket = await oauthClient.verifyIdToken({
        idToken,
        audience: CLIENT_ID, // verify aud
      });
      payload = ticket.getPayload();
    } else {
      // Fallback: verify access token by fetching userinfo from Google
      const resp = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${encodeURIComponent(
          accessToken
        )}`
      );
      if (!resp.ok) throw new Error("Invalid access token");
      payload = await resp.json();
    }

    if (!payload || !payload.sub) throw new Error("Invalid token payload");

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;

    // TODO: upsert user in DB using googleId/email

    // Create your own session / JWT:
    const token = jwt.sign({ sub: googleId, email, name }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // send as httpOnly cookie (recommended)
    res.cookie("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ ok: true, user: { email, name } });
  } catch (err) {
    console.error("Token verify failed", err);
    return res.status(401).json({ error: "Invalid token" });
  }
});

app.listen(process.env.PORT || 4000, () => console.log("Server started"));
