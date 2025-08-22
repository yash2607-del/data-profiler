import jsforce from "jsforce";

class SalesforceService {
  constructor() {
    this.oauth2 = new jsforce.OAuth2({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
      loginUrl: process.env.SF_LOGIN_URL
    });
  }

  getAuthUrl(state) {
    return this.oauth2.getAuthorizationUrl({
      scope: "api id profile email address phone refresh_token",
      state: state || ""
    });
  }

  async handleCallback(authCode) {
    const conn = new jsforce.Connection({ oauth2: this.oauth2 });
    await conn.authorize(authCode);
    return {
      accessToken: conn.accessToken,
      refreshToken: conn.refreshToken,
      instanceUrl: conn.instanceUrl,
      userInfo: conn.userInfo
    };
  }
}

export default new SalesforceService();
