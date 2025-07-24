import React, { useState } from 'react'
import { Form, Button, Card, Alert, Container, Spinner } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'
import { Eye, EyeSlash } from 'react-bootstrap-icons'
import { toast } from 'react-toastify';

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    setError('');

    try {
      const loginData = await login(username, password);
      setLoading(false);

      if (loginData.success) {
        toast.success('Login successful!');
        props.onLoginChange(true);
        navigate('/home');
      } else {
        // Show server message if available
        setError(loginData.message || 'Invalid credentials. Try again.');
      }
    } catch (err) {
      setLoading(false);

      // Try to get the error message from different places
      const errorMessage =
        err?.response?.data?.message || // axios style
        err?.message ||                 // JS error object
        'Something went wrong. Please try again.';

      setError(errorMessage);
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

          <Form.Group controlId="formPassword" className="mb-4 position-relative">
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <span
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              style={{ cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeSlash /> : <Eye />}
            </span>
          </Form.Group>


          <Button type="submit" variant="primary" className="w-100" disabled={loading}>
            {loading ? (
              <span>
                <Spinner animation="border" variant="light" size="sm" /> Logging in...
              </span>
            ) : (
              'Login'
            )}
          </Button>
          <div>Don't have an account? <Link to={'/registeration'}>Sign up</Link></div>
        </Form>
      </Card>
    </Container>
  )
}

export default Login