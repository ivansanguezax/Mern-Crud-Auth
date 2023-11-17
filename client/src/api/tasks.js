// Import the configured axios instance from the axios.js file
import axios from "./axios";

// Requests all tasks from the server
export const getTasksRequest = async () => axios.get("/tasks");

// Sends a request to create a new task to the server
export const createTaskRequest = async (task) => axios.post("/tasks", task);

// Sends a request to update a specific task to the server
export const updateTaskRequest = async (id, task) =>
  axios.put(`/tasks/${id}`, task);

// Sends a request to delete a specific task to the server
export const deleteTaskRequest = async (id) => axios.delete(`/tasks/${id}`);

// Requests a specific task by its ID from the server
export const getTaskRequest = async (id) => axios.get(`/tasks/${id}`);
