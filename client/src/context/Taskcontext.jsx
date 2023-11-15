import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
import { createTaskRequest, getTasksRequest } from "../api/tasks";

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  const createTask = async (tasks) => {
      const res = await createTaskRequest(tasks);
      console.log(res);
  };
  

  return (
    <TaskContext.Provider value={{ tasks, createTask, getTasks }}>
      {children}
    </TaskContext.Provider>
  );
}

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
