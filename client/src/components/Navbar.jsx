import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser } from "react-icons/fa";

// Functional component for the navigation bar
function Navbar() {
  // Destructure values from the authentication context
  const { isAuthenticated, logout, user } = useAuth();

  return (
    // Navigation bar container
    <nav className="flex justify-between items-center h-16 bg-zinc-900 text-white relative shadow-sm font-mono px-4">
      {/* Logo with conditional link based on authentication status */}
      <h1 className="text-green-400 text-xl font-bold">
        <Link to={isAuthenticated ? '/tasks' : '/login'}>Tasks Manager</Link>
      </h1>
      
      {/* Navigation menu */}
      <ul className="flex items-center text-white space-x-6">
        {/* Displayed when the user is authenticated */}
        {isAuthenticated ? (
          <>
            {/* User information */}
            <li className="flex items-center">
              <FaUser className="mr-2" /> 
              Welcome<span className="text-green-400 px-1">{user.username}</span>
            </li>
            
            {/* Link to add a new task */}
            <li className="hover:text-green-400 transition duration-300">
              <Link to="/add-task">Add Task</Link>
            </li>
            
            {/* Logout button */}
            <li>
              <button
                className="bg-green-500 hover:bg-white text-black hover:text-green-500 transition duration-300 py-2 px-4 rounded-md"
                onClick={() => logout()}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          // Displayed when the user is not authenticated
          <>
            {/* Link to login page */}
            <li className="hover:text-green-400 transition duration-300">
              <Link to="/login">Login</Link>
            </li>
            
            {/* Link to registration page  */}
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
