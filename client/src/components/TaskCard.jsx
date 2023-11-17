import PropTypes from 'prop-types';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { useTasks } from '../context/Taskcontext';
import { Link } from 'react-router-dom';

// Component for displaying a task card
function TaskCard({ task }) {
    // Access the deleteTask function from the TaskContext
    const { deleteTask } = useTasks();

    return (
        <div className="max-w-md bg-zinc-800 p-4 rounded-md shadow-md relative">
            {/* Task title */}
            <h1 className="text-lg font-bold text-green-400 mb-2">{task.title}</h1>
            {/* Task description */}
            <p className="text-white mb-4">{task.description}</p>
            
            {/* Task details and action buttons */}
            <div className="flex justify-between items-center">
                {/* Display the task date if available */}
                <p className="text-gray-500">
                    {task.date && new Date(task.date).toLocaleDateString()}
                </p>

                {/* Buttons for deleting and editing the task */}
                <div className="space-x-2">
                    {/* Button to delete the task */}
                    <button
                        onClick={() => {
                            deleteTask(task._id);
                        }}
                        className="text-white bg-red-500 p-2 rounded"
                    >
                        <FaTrash />
                    </button>

                    {/* Button to edit the task, linked to the task details page */}
                    <button className="text-white bg-blue-500 p-2 rounded">
                        <Link to={`/tasks/${task._id}`}>
                            <FaEdit />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

// PropTypes for the TaskCard component
TaskCard.propTypes = {
    task: PropTypes.object.isRequired, // Expects a 'task' object as a prop
};

export default TaskCard;
