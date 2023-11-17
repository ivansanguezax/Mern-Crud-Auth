import Task from "../models/task.model.js";

// Controller function to get all tasks for a specific user
export const getTasks = async (req, res) => {
  try {
    // Find tasks for the authenticated user and populate the 'user' field
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller function to create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;
    
    // Create a new task with user ID
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
    });

    // Save the new task to the database
    await newTask.save();
    
    // Send the new task in the response
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller function to delete a task
export const deleteTask = async (req, res) => {
  try {
    // Find and delete the task by ID
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    // If the task is not found, return a 404 status
    if (!deletedTask)
      return res.status(404).json({ message: "Task not found" });

    // Send a 204 status (No Content) in case of successful deletion
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller function to update a task
export const updateTask = async (req, res) => {
  try {
    const { title, description, date } = req.body;

    // Find and update the task by ID, returning the updated task
    const taskUpdated = await Task.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, date },
      { new: true }
    );

    // Send the updated task in the response
    return res.json(taskUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Controller function to get a specific task by ID
export const getTask = async (req, res) => {
  try {
    // Find the task by ID
    const task = await Task.findById(req.params.id);

    // If the task is not found, return a 404 status
    if (!task) return res.status(404).json({ message: "Task not found" });

    // Send the task in the response
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
