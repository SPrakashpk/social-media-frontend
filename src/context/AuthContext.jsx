import { createContext, useState, useEffect } from 'react'
import { login as loginService, logout as logoutService } from '../services/authService'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('chirp_token'))

  useEffect(() => {
    if (token) {
      // Optionally fetch user profile here
      setUser({ token })
    } else {
      setUser(null)
    }
  }, [token])

  const login = async (email, password) => {
    const data = await loginService(email, password)
    if (data.token) {
      setToken(data.token)
      setUser({ token: data.token })
    }
    return data
  }

  const logout = () => {
    logoutService()
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
