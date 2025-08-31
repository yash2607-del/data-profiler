// middlewares/auth.js
import jwt from "jsonwebtoken";

export const getUserId = (req, res, next) => {
  let token;

  // Priority 1: Authorization header
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  // Priority 2: query param (for redirect flows)
  else if (req.query.auth) {
    token = req.query.auth;
  }

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId || decoded.id || decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
