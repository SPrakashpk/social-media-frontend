import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import HomeLayout from './components/layout/HomeLayout'
import './App.css'
import Login from './pages/Login'
import Settings from './pages/Settings'
import { useState } from 'react'
import Register from './pages/Register'
import { ChatContainer } from './components/chat/ChatContainer'



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('chirp_token')); 
  const handleLoginChanges = (value) => setIsLoggedIn(value);
  return (
    <Router>
        <Routes>
          <Route
          path="/"
          element={isLoggedIn ? <HomeLayout /> : <Login onLoginChange={handleLoginChanges}/>}
        />
          <Route path='/registeration' element={<Register onLoginChange={handleLoginChanges}/>}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings/>} />
          <Route path="/messages" element={<ChatContainer/>} />

          {/* Add more routes as needed */}
        </Routes>
    </Router>
  )
}

export default App


