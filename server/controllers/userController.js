import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const { Workspace_name, user_name } = req.body;
    const userExist = await User.findOne({ Workspace_name,user_name });
    if (userExist)
      return res.status(400).json({ message: "User Already exists" });
    const newUser = new User({ Workspace_name, user_name });
    const saveData = await newUser.save();
    res.status(201).json(saveData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find();
    if (!userData || userData.length === 0)
    return  res.status(404).json({ message: "User not found" });

    res.status(201).json(userData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userbyID = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExists= await User.findById(id);
    if (!UserExists) return res.status(404).json({ message: "User not found" });
    res.status(201).json(UserExists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExists= await User.findById(id);
    if (!UserExists) return res.status(404).json({ message: "User not found" });

    const updatedData= await User.findByIdAndUpdate(id,req.body,{
        new:true
    })
    res.status(201).json(updatedData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const Deleteuser = async (req, res) => {
  try {
    const id = req.params.id;
    const UserExists= await User.findById(id);
    if (!UserExists) return res.status(404).json({ message: "User not found" });
    const updatedData= await User.findByIdAndDelete(id,req.body,{
        new:true
    })
    res.status(200).json({message:"User deleted successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

