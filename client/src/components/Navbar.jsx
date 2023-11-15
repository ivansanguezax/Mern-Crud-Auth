import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav
      className="
        flex
        justify-between
        items-center
        h-16
        bg-zinc-900
        text-white
        relative
        shadow-sm
        font-mono
        px-4 
      "
    >
      <h1 className="text-green-400 text-xl font-bold">
        <Link to="/">Tasks Manager</Link>
      </h1>
      <ul
        className="
          flex
          items-center
          text-white
          space-x-6
        "
      >
        {isAuthenticated ? (
          <>
            <li className="flex items-center">
              <FaUser className="mr-2 " />{" "}
              {/* Icono de usuario */}
              Welcome<span className="text-green-400 px-1">{user.username}</span>
            </li>
            <li className="hover:text-green-400 transition duration-300">
              <Link to="/add-tasks">Add Task</Link>
            </li>
            <li>
              <button
                className="bg-green-500 hover:bg-white
    text-black
    hover:text-green-500
    transition duration-300
    py-2 px-4
    rounded-md
  "
                onClick={() => logout()}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="hover:text-green-400 transition duration-300">
              <Link to="/login">Login</Link>
            </li>
            <li className="hover:text-green-400 transition duration-300">
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
