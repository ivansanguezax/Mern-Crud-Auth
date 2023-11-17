import { useEffect } from "react";
import { useTasks } from "../context/Taskcontext";
import { FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

// TaskPage component to display a list of tasks
function TaskPage() {
  // Destructuring properties from the task context
  const { getTasks, tasks } = useTasks();

  // Effect to fetch tasks when the component mounts
  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <div className="p-10">
      {/* Check if there are no tasks */}
      {tasks.length === 0 ? (
        <>
          {/* Display message for no tasks */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold mb-4">
              <FaExclamationTriangle className="text-yellow-500 inline-block mr-2" />
              No hay tareas
            </h1>

            {/* Link to add a new task */}
            <Link
              to="/add-task"
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
            >
              Añadir tarea
            </Link>
          </div>
        </>
      ) : (
        // Display tasks
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
          {tasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskPage;
