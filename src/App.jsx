import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Profile from './pages/Profile';
import HomeLayout from './components/layout/HomeLayout';
import './App.css';
import Login from './pages/Login';
import Settings from './pages/Settings';
import { useState } from 'react';
import Register from './pages/Register';
import { ChatContainer } from './components/chat/ChatContainer';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OtpVerify from './pages/otpVerify';
import LandingPage from './pages/LandingPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('chirp_token'));

  const handleLoginChanges = (value) => {
    setIsLoggedIn(value);
    if (value) {
      // localStorage.setItem('chirp_token', value); // save token
    } else {
      localStorage.removeItem('chirp_token'); // clear token on logout
    }
  };

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/login" replace />;
  };

  return (
    <><ToastContainer position="top-center" />
    <Router>
      <Header isLoggedIn={isLoggedIn} onLogout={() => handleLoginChanges(false)} />
      <Routes>
        {/* Public routes */}
        {/* <Route path="/" element={<Navigate to="/home" replace />} /> */}
           <Route path="/" element={<LandingPage  />} />
        <Route path="/login" element={<Login onLoginChange={handleLoginChanges} />} />
        <Route path="/signup" element={<Register onLoginChange={handleLoginChanges} />} />
        <Route path="/verify-otp" element={<OtpVerify />} />


        {/* Private routes */}
        <Route path="/home" element={<PrivateRoute><HomeLayout /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="/profile/:id" element={<PrivateRoute><Profile/></PrivateRoute>} />

        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/messages" element={<PrivateRoute><ChatContainer /></PrivateRoute>} />
        <Route path="/messages/:chatId" element={<PrivateRoute><ChatContainer /></PrivateRoute>} />
      </Routes>
    </Router></>
  );
}

export default App;
