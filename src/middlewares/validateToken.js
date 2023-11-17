import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config.js";

// Middleware to check if a valid token is present in the request cookies
export const authRequired = (req, res, next) => {
  const { token } = req.cookies;

  // Check if token is missing
  if (!token)
    return res.status(401).json({ message: "No token, authorization denied" });

  // Verify the token using the TOKEN_KEY
  jwt.verify(token, TOKEN_KEY, (err, decoded) => {
    // Check if token is not valid
    if (err) return res.status(401).json({ message: "Token is not valid" });

    // Attach the decoded user information to the request object
    req.user = decoded;
  });

  // Move to the next middleware or route handler
  next();
};
