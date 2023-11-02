import jwt from "jsonwebtoken";
import { TOKEN_KEY } from "../config.js";

export const authRequired = (req, res, next) => {
  const { token } = req.cookies;
  if (!token)
    return res.status(401).json({ message: "No Toke, authorization denied" });
  jwt.verify(token, TOKEN_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Token is not valid" });
    req.user = decoded;
  });

  next();
};
