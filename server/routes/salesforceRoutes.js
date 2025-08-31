import express from 'express';
import jwt from 'jsonwebtoken';
import SalesforceService from '../services/salesforceServices.js';
import SalesforceToken from '../models/salesforceTokenModel.js';

const router = express.Router();

// Middleware to get userId from JWT (header or query)
export const getUserId = (req, res, next) => {
  const authHeader = req.headers.authorization || req.query.auth;
  if (!authHeader) return res.status(401).json({ error: 'Unauthorized - No token' });

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId || decoded.id || decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};

// Connect to Salesforce
router.get('/connect', getUserId, (req, res) => {
  try {
    const state = jwt.sign({ userId: req.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const authUrl = SalesforceService.getAuthUrl(state);
    res.redirect(authUrl); // Redirect to Salesforce login
  } catch (error) {
    console.error('OAuth initiation error:', error);
    res.status(500).json({ error: 'Failed to initiate Salesforce OAuth' });
  }
});

// Salesforce OAuth callback
router.get('/callback', async (req, res) => {
  const { code, state, error } = req.query;
  if (error) return res.redirect('https://data-profiler.vercel.app/dashboard?error=salesforce_auth_failed');
  if (!code || !state) return res.status(400).json({ error: 'Missing code or state' });

  try {
    const decoded = jwt.verify(state, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const result = await SalesforceService.handleCallback(code);

    await SalesforceToken.findOneAndUpdate(
      { userId },
      {
        userId,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
        instanceUrl: result.instanceUrl,
        expiresAt: new Date(Date.now() + 3600000)
      },
      { upsert: true, new: true }
    );

    res.redirect('https://data-profiler.vercel.app/sf-success');
  } catch (err) {
    console.error('Callback error:', err);
    res.redirect('https://data-profiler.vercel.app/dashboard?error=salesforce_auth_failed');
  }
});

export default router;
  