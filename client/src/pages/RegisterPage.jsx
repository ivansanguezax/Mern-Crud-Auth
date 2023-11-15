import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { singup, isAuthenticated, user, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks");
    }
  } , [isAuthenticated, navigate])

  const onSubmit = handleSubmit(async (data) => {
    await singup(data);
    console.log(user);
  });

  
  return (
    <div
      className="
      flex flex-col items-center justify-center h-screen bg-black
    "
    >
      {registerErrors.map((error, index) => (
        <span key={index} className="text-red-500">
          {error}
        </span>
      ))}
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <h1
          className="
        text-3xl
        font-semibold
        text-center
        "
        >
          Register
        </h1>
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
          {errors.username && (
            <span className="text-red-500">Username is required</span>
          )}
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
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
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
          {errors.password && (
            <span className="text-red-500">Password is required</span>
          )}
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

        <p
          className="
      my-2
        text-center
        text-gray-400
      "
        >
          Already have an account?{" "}
          <Link to="/login" className="text-green-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
