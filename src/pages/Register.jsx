import React, { useState, useEffect } from 'react';
import {
  Form,
  FormGroup,
  FormControl,
  Button,
  Card,
  Alert,
  FormText,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { EyeFill, EyeSlashFill, Google } from 'react-bootstrap-icons';
import { register, checkUsernameAvailability } from '../services/authService';
import { toast } from 'react-toastify';

const Register = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });

  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [checkingUsername, setCheckingUsername] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const check = async () => {
      if (username.length >= 3) {
        setCheckingUsername(true);
        const available = await checkUsernameAvailability(username);
        setIsAvailable(available);
        setCheckingUsername(false);
      } else {
        setIsAvailable(null);
      }
    };
    const delay = setTimeout(check, 500); // debounce
    return () => clearTimeout(delay);
  }, [formData.username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === 'username') setUsername(value);
  };

  const validate = () => {
    const { name, email, password, confirmPassword, username } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !password || !confirmPassword || !username) {
      setError('All fields are required.');
      return false;
    }

    if (!emailRegex.test(email)) {
      setError('Enter a valid email address.');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    if (isAvailable === false) {
      setError('Username is not available.');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validate()) return;
    const registerData = await register({ ...formData });
    if (registerData.success) {
      props.onLoginChange(true);
      toast.success('LogRegistration successful!');
      navigate('/home');
    } else {
      setError(registerData.message || 'Registration failed');

    }
  };

  return (
    <Card className="p-4 mx-auto mt-5" style={{ maxWidth: '450px' }}>
      <h3 className="text-center mb-3">Create Account</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
          />
        </Form.Group>

        <FormGroup controlId="username" className="mb-3">
          <Form.Label>Username</Form.Label>
          <InputGroup>
            <FormControl
              type="text"
              value={formData.username}
              name="username"
              placeholder="Username"
              onChange={handleChange}
              isInvalid={isAvailable === false}
              isValid={isAvailable === true}
              required
            />
            {checkingUsername && (
              <InputGroup.Text>
                <Spinner animation="border" size="sm" />
              </InputGroup.Text>
            )}
          </InputGroup>
          {isAvailable === false && (
            <FormText className="text-danger">Username is taken</FormText>
          )}
          {isAvailable === true && (
            <FormText className="text-success">Username is available</FormText>
          )}
        </FormGroup>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <FormControl
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showPassword ? <EyeSlashFill /> : <EyeFill />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <InputGroup>
            <FormControl
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              required
            />
            <Button
              variant="outline-secondary"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <EyeSlashFill /> : <EyeFill />}
            </Button>
          </InputGroup>
        </Form.Group>

        <div className="d-grid gap-2 mb-3">
          <Button variant="primary" type="submit">
            Sign up
          </Button>
          <Button variant="outline-danger">
            <Google className="me-2" />
            Sign up with Google
          </Button>
        </div>

        <div className="text-center">
          <Button variant="link" onClick={() => navigate('/')}>
            Already have an account? Login
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Register;
