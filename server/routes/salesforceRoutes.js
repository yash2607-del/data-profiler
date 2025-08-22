import express from "express";
import jsforce from "jsforce";
import jwt from "jsonwebtoken";
import SalesforceService from "../services/salesforceServices.js";
import SalesforceToken from "../models/salesforceTokenModel.js";

const router = express.Router();
const { JWT_SECRET } = process.env;

// Step 1: Connect
router.get("/connect", (req, res) => {
  const state = req.query.state || ""; // JWT from frontend
  const authUrl = SalesforceService.getAuthUrl(); // scope is defined in service
  // Append state manually
  res.redirect(authUrl + `&state=${encodeURIComponent(state)}`);
});

// Step 2: Callback
router.get("/callback", async (req, res) => {
  const { code, state } = req.query;
  if (!code) return res.status(400).send("Missing code");

  let userId = state || "default"; // ideally decode JWT
  try {
    const tokenData = await SalesforceService.handleCallback(code);

    await SalesforceToken.findOneAndUpdate(
      { userId },
      {
        userId,
        accessToken: tokenData.accessToken,
        refreshToken: tokenData.refreshToken,
        instanceUrl: tokenData.instanceUrl
      },
      { upsert: true, new: true }
    );

    res.redirect("https://data-profiler.vercel.app/sf-success");
  } catch (err) {
    console.error("Salesforce OAuth failed:", err.message);
    res.status(500).send("Salesforce OAuth failed");
  }
});
router.get("/objects", async (req, res) => {
  try {
    const tokenData = await SalesforceToken.findOne({ userId: "default" });
    if (!tokenData) return res.status(400).send("Not connected to Salesforce");

    const conn = new jsforce.Connection({
      accessToken: tokenData.accessToken,
      instanceUrl: tokenData.instanceUrl
    });

    const objects = await conn.describeGlobal();
    res.json(objects.sobjects); // returns all objects
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Failed to fetch Salesforce objects");
  }
});

export default router;
