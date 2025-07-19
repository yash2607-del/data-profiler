import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["USER", "ADMIN", "STEWARD"],
    required: true,
    uppercase: true
  },
  createdAt: { type: Date, default: Date.now }
});

const Auth = mongoose.model("Auth", userSchema);
export default Auth;
