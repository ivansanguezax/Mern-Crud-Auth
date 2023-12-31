import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Login page component
function LoginPage() {
  // Destructuring properties from react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Destructuring properties from the authentication context
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Function to handle form submission
  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  // Effect to navigate to the tasks page when authenticated
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-3xl font-semibold text-center">Login</h1>

        {signinErrors.map((error, index) => (
          <div className="bg-red-500 p-2 rounded-md text-white" key={index}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit} className="flex flex-col items-center justify-center">
          <input
            type="text"
            {...register("email", { required: true, minLength: 3, maxLength: 20 })}
            className="border-2 border-gray-200 rounded-md p-2 my-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
            placeholder="Email"
          />
          {errors.email && <span className="text-red-500">Email is required</span>}

          <input
            type="password"
            {...register("password", { required: true, minLength: 6, maxLength: 20 })}
            className="border-2 border-gray-200 rounded-md p-2 my-2 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700"
            placeholder="Password"
          />
          {errors.password && <span className="text-red-500">Password is required</span>}

          <input
            type="submit"
            value="Login"
            className="border-2 border-gray-200 rounded-md p-2 my-2 focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-200 hover:bg-gray-300 cursor-pointer text-gray-700"
          />
        </form>

        <p className="my-2 text-center text-gray-400">
          No tienes una cuenta?{" "}
          <Link className="text-green-500 hover:text-green-600" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
