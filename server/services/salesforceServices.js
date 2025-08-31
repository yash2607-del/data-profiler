import axios from 'axios';
import qs from 'qs';

const CLIENT_ID = process.env.SF_CLIENT_ID;
const CLIENT_SECRET = process.env.SF_CLIENT_SECRET;
const REDIRECT_URI = process.env.SF_REDIRECT_URI;

const SalesforceService = {
  getAuthUrl: (state) => {
    return `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=api id profile email refresh_token&state=${state}`;
  },

  handleCallback: async (code) => {
    const body = {
      grant_type: 'authorization_code',
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
    };
    const res = await axios.post('https://login.salesforce.com/services/oauth2/token', qs.stringify(body), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return {
      accessToken: res.data.access_token,
      refreshToken: res.data.refresh_token,
      instanceUrl: res.data.instance_url
    };
  }
};

export default SalesforceService;
