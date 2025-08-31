import jwt from 'jsonwebtoken';

export const getUserId = (req, res, next) => {
  const authHeader = req.headers.authorization || req.query.auth;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized - No token' });

  const token = authHeader.split ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId || decoded.id;
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
