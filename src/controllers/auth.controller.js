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

export const login = async (req, res) => res.send("login");
