import User from "../models/user.model.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = new User({ username, email, password });
    const newUserSaved = await newUser.save();
    res.json(newUserSaved);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => res.send("login");
