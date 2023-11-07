import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import {useNavigate} from 'react-router-dom'


function RegisterPage() {
  const { register, handleSubmit, formState:{
    errors
  } } = useForm();
  const { singup, isAuth, user, errors: registerErrors } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuth) {
      navigate('/tasks')
    }
  }, [isAuth]);



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
      {
      registerErrors.map((error, index) => (
        <span key={index} className="text-red-500">{error}</span>
      ))
      }
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
        {
          errors.username && <span className="text-red-500">Username is required</span>
        }
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
                {
          errors.email && <span className="text-red-500">Email is required</span>
        }
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
        {
          errors.password && <span className="text-red-500">Password is required</span>
        }
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
