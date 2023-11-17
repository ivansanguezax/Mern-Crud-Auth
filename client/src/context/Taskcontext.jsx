import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createTaskRequest, deleteTaskRequest, getTasksRequest, getTaskRequest, updateTaskRequest } from "../api/tasks";

// Create a context for task management
const TaskContext = createContext();

// Custom hook to access the task context
export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

// Task provider component
export function TaskProvider({ children }) {
  // State variable for storing tasks
  const [tasks, setTasks] = useState([]);

  // Function to get all tasks
  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to create a new task
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to delete a task
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 200) {
        const newTasks = tasks.filter((task) => task._id !== id);
        setTasks(newTasks);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get a specific task by ID
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  // Function to update a task
  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  // Provide the task context to the children components
  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask }}>
      {children}
    </TaskContext.Provider>
  );
}

// PropTypes for the TaskProvider component
TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
