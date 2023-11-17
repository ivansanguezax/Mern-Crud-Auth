import { useForm } from "react-hook-form";
import { useTasks } from "../context/Taskcontext";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";

// TaskFormPage component for adding or editing tasks
function TaskFormPage() {
  // Destructuring properties from react-hook-form
  const { register, handleSubmit, setValue } = useForm();

  // Destructuring properties from the task context
  const { createTask, getTask, updateTask } = useTasks();
  
  // Navigation hook from react-router-dom
  const navigate = useNavigate();
  // Params hook from react-router-dom
  const params = useParams();

  // Effect to load task data if editing
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);
        setValue('title', task.title);
        setValue('description', task.description);
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  // Function to handle form submission
  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, data);
    } else {
      createTask(data);
    }
    navigate('/tasks');
  });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {/* TaskFormPage header */}
        <h1 className="text-3xl font-semibold text-center pb-5">
          Agregar tarea
        </h1>

        {/* Task form */}
        <form onSubmit={onSubmit} className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
          {/* Title input */}
          <input
            type="text"
            className="border border-gray-400 mb-3 p-3 rounded-lg outline-none focus:border-blue-500 w-full text-gray-600"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />

          {/* Description textarea */}
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="border border-gray-400 mb-3 p-3 rounded-lg outline-none focus:border-blue-500 w-full text-gray-600"
          ></textarea>

          {/* Save button */}
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
