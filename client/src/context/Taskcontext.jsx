import { createContext, useContext } from "react";
import PropTypes from "prop-types";

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTask must be used within a TaskProvider");
    return context;
}

export function TaskProvider({ children }) {
    return (
        <TaskContext.Provider value={{}}>
            {children}
        </TaskContext.Provider>
    );
}

TaskProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
