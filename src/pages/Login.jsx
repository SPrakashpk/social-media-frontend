import React, { useState } from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    const loginData = await login(username, password);
    if (loginData.success) {
      props.onLoginChange(true);
    } else {
      setError('Invalid credentials. Try again.')
    }
  }


  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h3 className="mb-4 text-center">Login</h3>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formUsername" className="mb-3">
            
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username or email address"
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
          <div>Don't have an account? <Link to={'/registeration'}>Sign up</Link></div>
        </Form>
      </Card>
    </Container>
  )
}

export default Login
