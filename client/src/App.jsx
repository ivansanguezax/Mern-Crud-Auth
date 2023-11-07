import {BrowserRouter, Routes, Route} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import { AuthProvider } from './context/AuthContext'
import TaskPage from './pages/TaskPage'
import TaskFormPage from './pages/TaskFormPage'
import ProfilePage from './pages/ProfilePage'
import Homepage from './pages/Homepage'


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>} />      
        <Route path="/login" element={<LoginPage/>} />      
        <Route path="/register" element={<RegisterPage/>}/>      
        <Route path="/tasks" element={<TaskPage/>} />      
        <Route path="/add-task" element={<TaskFormPage/>}/>      
        <Route path="/tasks/:id" element={<TaskFormPage/>} />      
        <Route path="/profile" element={<ProfilePage/>} />      
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
