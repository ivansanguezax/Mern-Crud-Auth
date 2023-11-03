import { useForm } from "react-hook-form";
import { registerRequest } from "../api/auth";

function RegisterPage() {
  const { register, handleSubmit } = useForm();
  const onSubmit = handleSubmit(async (data) => {
    const response = await registerRequest(data);
    console.log(response);
  });
  return (
    <div
      className="
      flex flex-col items-center justify-center h-screen bg-black
    "
    >
      <form
        onSubmit={onSubmit}
        className="
            flex flex-col items-center justify-center"
      >
        <input
          type="text"
          {...register("username", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
          className="
            border-2
            border-gray-200
            rounded-md
            p-2
            my-2
            focus:outline-none
            focus:ring-2
            focus:ring-green-400
            text-gray-700
            "
          placeholder="Username"
        />
        <input
          type="text"
          {...register("email", {
            required: true,
            minLength: 3,
            maxLength: 20,
          })}
          className="
            border-2
            border-gray-200
            rounded-md
            p-2
            my-2
            focus:outline-none
            focus:ring-2
            focus:ring-green-400
            text-gray-700"
          placeholder="Email"
        />
        <input
          type="password"
          {...register("password", {
            required: true,
            minLength: 6,
            maxLength: 20,
          })}
          className="
            border-2
            border-gray-200
            rounded-md
            p-2
            my-2
            focus:outline-none
            focus:ring-2
            focus:ring-green-400
            text-gray-700
            "
          placeholder="Password"
        />
        <input
          type="submit"
          value="Register"
          className="
            border-2
            border-gray-200
            rounded-md
            p-2
            my-2
            focus:outline-none
            focus:ring-2
            focus:ring-green-400
            bg-gray-200
            hover:bg-gray-300
            cursor-pointer
            text-gray-700
        "
        />
      </form>
    </div>
  );
}

export default RegisterPage;
