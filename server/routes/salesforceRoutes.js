import express from "express";
import jwt from "jsonwebtoken";
import SalesforceService from "../services/salesforceServices.js";
import SalesforceToken from "../models/salesforceTokenModel.js";
import { getUserId } from "../middlewares/authMiddleware.js";

const router = express.Router();

// --- Connect ---
router.get("/connect", getUserId, (req, res) => {
  try {
    // Backend generates its own state, do NOT trust frontend
    const state = jwt.sign({ userId: req.userId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const authUrl = SalesforceService.getAuthUrl(state);

    console.log("Salesforce Auth URL:", authUrl);
    res.redirect(authUrl);
  } catch (error) {
    console.error("OAuth initiation error:", error);
    res.status(500).json({ error: "Failed to initiate Salesforce OAuth" });
  }
});

// --- Callback ---
router.get("/callback", async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    console.error("Salesforce OAuth error:", error);
    return res.redirect(
      "https://data-profiler.vercel.app/dashboard?error=salesforce_auth_failed"
    );
  }

  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }

  try {
    let userId;
    if (state) {
      try {
        const decoded = jwt.verify(state, process.env.JWT_SECRET);
        userId = decoded.userId;
      } catch (err) {
        console.error("Invalid state parameter:", err);
        return res.status(400).json({ error: "Invalid state parameter" });
      }
    } else {
      return res.status(400).json({ error: "Missing state parameter" });
    }

    const result = await SalesforceService.handleCallback(code);

    await SalesforceToken.findOneAndUpdate(
      { userId },
      {
        userId,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        instanceUrl: result.instanceUrl,
        expiresAt: new Date(Date.now() + 3600000),
      },
      { upsert: true, new: true }
    );

    console.log("Salesforce connection successful for user:", userId);

    // send sf_token in redirect for frontend to use
    res.redirect(
      `https://data-profiler.vercel.app/sf-success?sf_token=${result.accessToken}`
    );
  } catch (error) {
    console.error("Salesforce callback error:", error);
    res.redirect(
      "https://data-profiler.vercel.app/dashboard?error=salesforce_auth_failed"
    );
  }
});

// --- Status ---
router.get("/status", getUserId, async (req, res) => {
  try {
    const tokenData = await SalesforceToken.findOne({ userId: req.userId });

    if (!tokenData) {
      return res.json({ connected: false });
    }

    const isExpired = new Date() > tokenData.expiresAt;

    res.json({
      connected: true,
      expired: isExpired,
      instanceUrl: tokenData.instanceUrl,
      lastUpdated: tokenData.updatedAt,
    });
  } catch (error) {
    console.error("Status check error:", error);
    res.status(500).json({ error: "Failed to check connection status" });
  }
});

// --- Objects ---
router.get("/objects", getUserId, async (req, res) => {
  try {
    const objects = await SalesforceService.getObjects(req.userId);
    res.json(objects);
  } catch (error) {
    console.error("Get objects error:", error);

    if (error.message.includes("No Salesforce connection")) {
      return res.status(400).json({
        error: "Not connected to Salesforce",
        needsAuth: true,
      });
    }

    res.status(500).json({ error: "Failed to fetch Salesforce objects" });
  }
});

// --- Query ---
router.post("/query", getUserId, async (req, res) => {
  try {
    const { soql } = req.body;

    if (!soql) {
      return res.status(400).json({ error: "SOQL query is required" });
    }

    const result = await SalesforceService.queryData(req.userId, soql);
    res.json(result);
  } catch (error) {
    console.error("Query error:", error);
    res.status(500).json({ error: "Query execution failed" });
  }
});

// --- Disconnect ---
router.delete("/disconnect", getUserId, async (req, res) => {
  try {
    await SalesforceToken.findOneAndDelete({ userId: req.userId });
    res.json({ message: "Salesforce connection removed successfully" });
  } catch (error) {
    console.error("Disconnect error:", error);
    res.status(500).json({ error: "Failed to disconnect Salesforce" });
  }
});

export default router;
