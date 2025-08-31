import express from 'express';
import jwt from 'jsonwebtoken';
import SalesforceService from '../services/salesforceServices.js';
import SalesforceToken from '../models/salesforceTokenModel.js';
import { getUserId } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Connect Salesforce
router.get('/connect', getUserId, (req, res) => {
  const state = jwt.sign({ userId: req.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const authUrl = SalesforceService.getAuthUrl(state);
  res.redirect(authUrl);
});

// Salesforce callback
router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  if (!code || !state) return res.status(400).json({ error: 'Missing code or state' });

  const decoded = jwt.verify(state, process.env.JWT_SECRET);
  const userId = decoded.userId;

  const tokens = await SalesforceService.handleCallback(code);

  await SalesforceToken.findOneAndUpdate(
    { userId },
    {
      userId,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      instanceUrl: tokens.instanceUrl,
      expiresAt: new Date(Date.now() + 3600000)
    },
    { upsert: true, new: true }
  );

  res.redirect('https://data-profiler.vercel.app/sf-success');
});

export default router;
