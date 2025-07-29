import express from "express";
import jsforce from "jsforce";

const sfrouter = express.Router();

sfrouter.get("/auth", (req, res) => {
  const oauth2 = new jsforce.OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  const url = oauth2.getAuthorizationUrl({});
  res.redirect(url);
});

sfrouter.get("/callback", async (req, res) => {
  const oauth2 = new jsforce.OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  const conn = new jsforce.Connection({ oauth2 });

  try {
    await conn.authorize(req.query.code);
    const identity = await conn.identity();
    console.log("Salesforce user:", identity);
    res.redirect(`https://data-profiler.vercel.app/connection?token=${conn.accessToken}`);
  } catch (error) {
    console.error("Salesforce auth error:", error.message);
    res.status(500).send("Salesforce authentication failed.");
  }
});

export default sfrouter;
