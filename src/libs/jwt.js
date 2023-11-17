import { TOKEN_KEY } from "../config.js";
import jwt from "jsonwebtoken";

// Function to create an access token using the provided payload
export function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    // Sign the payload with the TOKEN_KEY and set an expiration of 1 day
    jwt.sign(payload, TOKEN_KEY, { expiresIn: "1d" }, (err, token) => {
      if (err) reject(err);
      // Resolve with the generated token
      resolve(token);
    });
  });
}
