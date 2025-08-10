import 'dotenv/config';
import jsforce from 'jsforce';

const conn = new jsforce.Connection({
  loginUrl: process.env.SF_LOGIN_URL
});

conn.login(
  process.env.SF_USERNAME,
  process.env.SF_PASSWORD + process.env.SF_TOKEN,
  (err, userInfo) => {
    if (err) {
      console.error("Login failed:", err);
      return;
    }
    console.log("Login successful!");
    console.log("User ID:", userInfo.id);
    console.log("Org ID:", userInfo.organizationId);
  }
);
