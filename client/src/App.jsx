import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import TaskPage from "./pages/TaskPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import Homepage from "./pages/Homepage";
import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/Taskcontext";
import Navbar from "./components/Navbar";

// App component containing the main application structure
function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        {/* BrowserRouter for handling routes */}
        <BrowserRouter>
          {/* Navbar component for navigation */}
          <Navbar />

          {/* Routes component to define different pages */}
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/add-task" element={<TaskFormPage />} />
              <Route path="/tasks/:id" element={<TaskFormPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
