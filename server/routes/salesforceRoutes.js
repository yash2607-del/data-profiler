import express from 'express';
import jwt from 'jsonwebtoken';
import SalesforceService from "../services/salesforceServices.js";
import SalesforceToken from '../models/salesforceTokenModel.js';
import { getUserId } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Connect to Salesforce
router.get('/connect', getUserId, (req, res) => {
  const state = jwt.sign({ userId: req.userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const authUrl = SalesforceService.getAuthUrl(state);
  console.log('Salesforce Auth URL:', authUrl);  // copy-paste in browser for testing
  res.redirect(authUrl);
});

// Callback
router.get('/callback', async (req, res) => {
  const { code, state, error } = req.query;
  if (error) return res.redirect('https://data-profiler.vercel.app/dashboard?error=salesforce_auth_failed');

  if (!code || !state) return res.status(400).send('Missing code or state');

  let userId;
  try {
    const decoded = jwt.verify(state, process.env.JWT_SECRET);
    userId = decoded.userId;
  } catch {
    return res.status(400).send('Invalid state parameter');
  }

  try {
    const result = await SalesforceService.handleCallback(code);

    await SalesforceToken.findOneAndUpdate(
      { userId },
      { userId, accessToken: result.accessToken, refreshToken: result.refreshToken, instanceUrl: result.instanceUrl, expiresAt: new Date(Date.now() + 3600000) },
      { upsert: true, new: true }
    );

    res.redirect('https://data-profiler.vercel.app/sf-success');
  } catch (err) {
    console.error(err);
    res.redirect('https://data-profiler.vercel.app/dashboard?error=salesforce_auth_failed');
  }
});

export default router;
