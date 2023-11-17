// Configures an axios instance with the base URL and credential handling
import axios from "axios";

// Axios instance with predefined configuration
const instance = axios.create({
  baseURL: "http://localhost:3000/api", // Server's base URL
  withCredentials: true, // Enables sending authentication cookies
});

export default instance; // Exports the configured instance
