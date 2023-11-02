import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUserSaved = new User({
      username,
      email,
      password: hash,
    });
    const userSaved = await newUserSaved.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });
    const ismatch = await bcrypt.compare(password, userFound.password);
    if (!ismatch) return res.status(400).json({ message: "Wrong password" });


    
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    return res.send(200);
}