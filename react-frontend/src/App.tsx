import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';
import NavBar from './components/navbar.component';
import Login from './components/login.component';
import Register from './components/register.component';
import Home from './components/home.component';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className='container mt-3'>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/home'
            element={
              <ProtectedRoute element={<Home />} />
            }
          />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
