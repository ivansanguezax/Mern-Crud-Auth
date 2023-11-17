import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// ProtectedRoute component to handle access to protected pages
function ProtectedRoute() {
  // Destructuring properties from the authentication context
  const { loading, isAuthenticated } = useAuth();

  // Display loading message while checking authentication status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the nested routes (children components)
  return <Outlet />;
}

export default ProtectedRoute;
