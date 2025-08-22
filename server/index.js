import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import session from "express-session";

import route from './routes/UserRoutes.js';
import authRoutes from './routes/authRoutes.js';
import Auth from "./models/authModel.js";
import sfrouter from "./routes/salesforceRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;
const MONGOURL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;

app.use(express.json());
app.use(
  cors({
    origin:"*",
    credentials: true,
  })
);


app.use(session({
  secret: process.env.CLIENT_SECRET || "fallback_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    maxAge: 3600000,
  },
}));

app.use('/api', route);
app.use('/api/auth', authRoutes);
app.use('/api/salesforce', sfrouter); 

if (!JWT_SECRET || !MONGOURL) {
  console.error("Environment variables missing! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

// ✅ Authenticated Profile Endpoint
app.get("/api/profile", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Unauthorized" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await Auth.findOne({ email: decoded.email }).select("name email");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ name: user.name, email: user.email });
  } catch (err) {
    console.error("Profile fetch error:", err.message);
    res.status(401).json({ error: "Invalid token" });
  }
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});
