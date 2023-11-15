import { useForm } from "react-hook-form";
import { useTasks } from "../context/Taskcontext";

function TaskFormPage() {
  const { register, handleSubmit } = useForm();
  const  {createTask} = useTasks();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
  } );

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-semibold text-center pb-5">
          Agregar tarea
        </h1>

        <form
          onSubmit={onSubmit}
          className="bg-zinc-800 max-w-md w-full p-10 rounded-md"
        >
          <input
            type="text"
            className="borderborder-gray-400 mb-3 p-3 rounded-lg outline-none focus:border-blue-500 w-full text-gray-600"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          <textarea
            rows="3"
            placeholder="Description"
            {...register("description")}
            className="borderborder-gray-400 mb-3 p-3 rounded-lg outline-none focus:border-blue-500 w-full text-gray-600"
          ></textarea>
          <button className=" bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
