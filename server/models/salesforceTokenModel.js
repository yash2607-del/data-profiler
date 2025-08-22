import mongoose from "mongoose";

const SalesforceTokenSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String },
  instanceUrl: { type: String, required: true },
  expiresAt: { type: Date }
});

export default mongoose.model("SalesforceToken", SalesforceTokenSchema);
