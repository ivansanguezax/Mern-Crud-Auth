import { TOKEN_KEY } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Controller function for user registration
export const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    // Check if the email already exists
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["Email already exists"]);

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    const newUserSaved = new User({
      username,
      email,
      password: hash,
    });

    // Save the new user to the database
    const userSaved = await newUserSaved.save();

    // Create and send access token in response cookie
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);

    // Send user details in the response
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

// Controller function for user login
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Find the user with the provided email
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json({ message: "User not found" });

    // Compare the provided password with the hashed password in the database
    const ismatch = await bcrypt.compare(password, userFound.password);
    if (!ismatch) return res.status(400).json({ message: "Wrong password" });

    // Create and send access token in response cookie
    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);

    // Send user details in the response
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

// Controller function for user logout
export const logout = async (req, res) => {
  // Clear the access token cookie
  res.cookie("token", "", { expires: new Date(0) });
  return res.send(200);
};

// Controller function to get user profile
export const profile = async (req, res) => {
  // Find user by ID in the database
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: "User not found" });

  // Send user details in the response
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

// Controller function to verify the access token
export const verifyToken = async (req, res) => {
  // Extract the token from the request cookies
  const { token } = req.cookies;
  
  // If no token, return Unauthorized status
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  // Verify the token using the secret key
  jwt.verify(token, TOKEN_KEY, async (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });

    // Find user by ID in the database
    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "Unauthorized" });

    // Send user details in the response
    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  });
};
