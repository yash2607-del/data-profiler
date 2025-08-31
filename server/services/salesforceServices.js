import jsforce from 'jsforce';
import SalesforceToken from '../models/salesforceTokenModel.js';

class SalesforceService {
  constructor() {
    this.oauth2 = new jsforce.OAuth2({
      clientId: process.env.SALESFORCE_CLIENT_ID,
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,
      redirectUri: process.env.SALESFORCE_REDIRECT_URI,
      loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com'
    });
  }

  getAuthUrl(state = '') {
    return this.oauth2.getAuthorizationUrl({
      scope: 'api id profile email address phone refresh_token',
      state: state
    });
  }

  async handleCallback(authCode) {
    const conn = new jsforce.Connection({ oauth2: this.oauth2 });
    
    try {
      const userInfo = await conn.authorize(authCode);
      
      return {
        accessToken: conn.accessToken,
        refreshToken: conn.refreshToken,
        instanceUrl: conn.instanceUrl,
        userInfo: userInfo
      };
    } catch (error) {
      throw new Error(`Salesforce authorization failed: ${error.message}`);
    }
  }

  async getConnection(userId) {
    try {
      const tokenData = await SalesforceToken.findOne({ userId });
      if (!tokenData) {
        throw new Error('No Salesforce connection found for user');
      }

      if (new Date() > tokenData.expiresAt) {
        const conn = new jsforce.Connection({ oauth2: this.oauth2 });
        const result = await conn.refresh(tokenData.refreshToken);
        
        await SalesforceToken.findOneAndUpdate(
          { userId },
          {
            accessToken: result.access_token,
            instanceUrl: result.instance_url,
            expiresAt: new Date(Date.now() + 3600000)
          }
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
    } catch (error) {
      throw new Error(`Failed to establish Salesforce connection: ${error.message}`);
    }
  }

  async getObjects(userId) {
    try {
      const conn = await this.getConnection(userId);
      const describe = await conn.describeGlobal();
      return describe.sobjects.filter(obj => 
        obj.queryable && obj.retrieveable && 
        !obj.name.endsWith('__History') && 
        !obj.name.endsWith('__Share')
      );
    } catch (error) {
      throw new Error(`Failed to get objects: ${error.message}`);
    }
  }

  async queryData(userId, soql) {
    try {
      const conn = await this.getConnection(userId);
      const result = await conn.query(soql);
      return result;
    } catch (error) {
      throw new Error(`Query failed: ${error.message}`);
    }
  }
}

export default new SalesforceService();