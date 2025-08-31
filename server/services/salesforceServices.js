import jsforce from 'jsforce';
import SalesforceToken from '../models/salesforceTokenModel.js';

class SalesforceService {
  constructor() {
    this.oauth2 = new jsforce.OAuth2({
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_REDIRECT_URI,
      loginUrl: process.env.SALESFORCE_LOGIN_URL
    });
  }

  getAuthUrl(state = '') {
    return this.oauth2.getAuthorizationUrl({
      scope: 'api id profile email address phone refresh_token',
      state: state
    });
  }

  async handleCallback(code) {
    const conn = new jsforce.Connection({ oauth2: this.oauth2 });
    await conn.authorize(code);  // exchanges code for access token
    return {
      accessToken: conn.accessToken,
      refreshToken: conn.refreshToken,
      instanceUrl: conn.instanceUrl
    };
  }

  async getConnection(userId) {
    const tokenData = await SalesforceToken.findOne({ userId });
    if (!tokenData) throw new Error('No Salesforce connection found');

    if (new Date() > tokenData.expiresAt) {
      const conn = new jsforce.Connection({ oauth2: this.oauth2 });
      const result = await conn.refresh(tokenData.refreshToken);
      await SalesforceToken.findOneAndUpdate(
        { userId },
        { accessToken: result.access_token, instanceUrl: result.instance_url, expiresAt: new Date(Date.now() + 3600000) }
      );
      return new jsforce.Connection({
        oauth2: this.oauth2,
        accessToken: result.access_token,
        instanceUrl: result.instance_url
      });
    }

    return new jsforce.Connection({
      oauth2: this.oauth2,
      accessToken: tokenData.accessToken,
      instanceUrl: tokenData.instanceUrl
    });
  }
}

export default new SalesforceService();
