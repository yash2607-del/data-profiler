import mongoose from 'mongoose';

const salesforceTokenSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  accessToken: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
    required: true
  },
  instanceUrl: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now() + 3600000)
  }
}, {
  timestamps: true
});

export default mongoose.model('SalesforceToken', salesforceTokenSchema);
