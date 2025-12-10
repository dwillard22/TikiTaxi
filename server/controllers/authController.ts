// src/controllers/authController.ts
import { Request, Response } from "express";
import axios from "axios";

interface GoogleTokenInfo {
  email: string;
  name: string;
  picture?: string;
  sub: string;
}

// Verify Google OAuth token and create/login user
export const verifyGoogleAuth = async (req: Request, res: Response) => {
  try {
    const { accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: "Access token is required" });
    }

    // Verify token with Google
    const response = await axios.get(
      `https://www.googleapis.com/oauth2/v2/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const userInfo: GoogleTokenInfo = response.data;

    // TODO: Save or update user in database
    // For now, return user info
    const user = {
      id: userInfo.sub,
      email: userInfo.email,
      name: userInfo.name,
      picture: userInfo.picture,
      provider: "google",
    };

    // TODO: Generate JWT token for session management
    // For now, return user info
    res.json({
      success: true,
      user,
      message: "Authentication successful",
    });
  } catch (error: any) {
    console.error("Google auth error:", error);
    res.status(401).json({
      error: "Invalid or expired token",
      message: error.message,
    });
  }
};

// Verify Apple OAuth token and create/login user
export const verifyAppleAuth = async (req: Request, res: Response) => {
  try {
    const { idToken, user } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "ID token is required" });
    }

    // TODO: Verify Apple ID token with Apple's servers
    // Apple token verification requires additional setup with Apple's public keys
    // For now, accept the token and extract user info

    // TODO: Save or update user in database
    const userInfo = {
      id: user?.id || "apple_user",
      email: user?.email || "apple@example.com",
      name: user?.name || "Apple User",
      provider: "apple",
    };

    // TODO: Generate JWT token for session management
    res.json({
      success: true,
      user: userInfo,
      message: "Authentication successful",
    });
  } catch (error: any) {
    console.error("Apple auth error:", error);
    res.status(401).json({
      error: "Invalid or expired token",
      message: error.message,
    });
  }
};

