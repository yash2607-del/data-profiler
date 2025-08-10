import express from "express";
import axios from "axios";
import querystring from "querystring";

const router = express.Router();

const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
  SF_LOGIN_URL
} = process.env;

// Step 1: Redirect to Salesforce OAuth page
router.get("/connect", (req, res) => {
  if (!CLIENT_ID || !REDIRECT_URI) {
    return res.status(500).send("Salesforce env vars missing");
  }

  const params = querystring.stringify({
    response_type: "code",
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    // scope: "api refresh_token offline_access" // optional
  });

  res.redirect(`${SF_LOGIN_URL}/services/oauth2/authorize?${params}`);
});

// Step 2: OAuth callback from Salesforce
router.get("/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) return res.status(400).send("Missing code from Salesforce");

  try {
    const tokenResp = await axios.post(
      `${SF_LOGIN_URL}/services/oauth2/token`,
      querystring.stringify({
        grant_type: "authorization_code",
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const { access_token, refresh_token, instance_url } = tokenResp.data;
    req.session.salesforce = { access_token, refresh_token, instance_url };

    // Redirect to frontend success page
    res.redirect("https://data-profiler.vercel.app/sf-success");
  } catch (err) {
    console.error("Salesforce token error:", err.response?.data || err.message);
    res.status(500).send("Salesforce OAuth failed");
  }
});

// Step 3: Example - fetch Salesforce objects
router.get("/objects", async (req, res) => {
  const sf = req.session.salesforce;
  if (!sf || !sf.access_token) {
    return res.status(401).json({ error: "Not connected to Salesforce" });
  }

  try {
    const resp = await axios.get(`${sf.instance_url}/services/data/v60.0/sobjects`, {
      headers: { Authorization: `Bearer ${sf.access_token}` },
    });
    res.json(resp.data.sobjects);
  } catch (err) {
    console.error("Fetch objects error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch objects" });
  }
});

export default router;
