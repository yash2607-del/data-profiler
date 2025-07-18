import prisma from '../models/prisma.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

const JWT_SECRET=process.env.JWT_SECRET
export const register= async(req,res)=>{
    const {email,password,name,role}=req.body;
    const roleEnum = role.toUpperCase();
    try {
        if(!email || !password || !name || !roleEnum){
            res.send('No empty fields')
        }
        const hashed=await bcrypt.hash(password,10);
        const user= await prisma.user.create({
            data:{  email,password:hashed,name,role:roleEnum}
        })
      res.json({ message: 'User registered', user: { id: user.id, email: user.email, role: user.role } })
    } catch (error) {
         console.error("Registration error:", error);
        res.status(400).json({error:'Email already exists or invalid input!'})
    }

}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('User found:', user);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Check if password matches
    const valid = await bcrypt.compare(password, user.password);
    console.log('Password valid?', valid);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    // Respond with success and token
    res.json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};