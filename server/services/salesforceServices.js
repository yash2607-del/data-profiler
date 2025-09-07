import dotenv from "dotenv";
import fetch from "node-fetch"; // make sure node-fetch is installed
dotenv.config();

class SalesforceService {
  static getAuthUrl(state) {
    const baseUrl = process.env.SALESFORCE_LOGIN_URL;
    const clientId = process.env.SF_CLIENT_ID;
    const redirectUri = process.env.SF_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      throw new Error("Missing Salesforce ENV vars");
    }

    return `${baseUrl}/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&scope=api%20id%20profile%20email%20refresh_token&state=${state}`;
  }

  static async handleCallback(code) {
    const tokenUrl = `${process.env.SALESFORCE_LOGIN_URL}/services/oauth2/token`;
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("client_id", process.env.SF_CLIENT_ID);
    params.append("client_secret", process.env.SF_CLIENT_SECRET);
    params.append("redirect_uri", process.env.SF_REDIRECT_URI);

    const res = await fetch(tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!res.ok) throw new Error(`Salesforce token fetch failed: ${res.status}`);
    return res.json(); // ✅ returns access_token, refresh_token, instance_url
  }
}

export default SalesforceService;
