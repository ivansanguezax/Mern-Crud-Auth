// Imports the axios library from the axios.js file
import axios from "./axios";

// Function that sends a registration request to the server
export const registerRequest = (user) =>
  axios.post(`/register`, user);

// Function that sends a login request to the server
export const loginRequest = (user) => axios.post(`/login`, user);

// Function that sends a request to verify the authentication token to the server
export const verifyTokenRequest = () => axios.get(`/verify`);
