import User from '../models/authModel.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

export const register = async (req, res) => {
  const { email, password, name, role } = req.body;
  const roleEnum = role.toUpperCase();

  if (!email || !password || !name || !roleEnum) {
    return res.status(400).json({ error: "No empty fields allowed" });
  }

  try {
    // Check if user already exists 
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      email,
      password: hashed,
      name,
      role: roleEnum,
    });

    res.json({
      message: "User registered",
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      console.log("Invalid password");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing!");
      return res.status(500).json({ error: "Server config error" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET
    );

    console.log("Login successful, token issued");

    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};
