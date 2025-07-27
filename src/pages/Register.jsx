import React, { useState, useEffect } from 'react';
import { Form, FormGroup, FormControl, Button, Card, Alert, FormText } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { register } from '../services/authService';
import { checkUsernameAvailability } from '../services/authService';

const Register = (props) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
  });


  const [username, setUsername] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);

  useEffect(() => {
    const check = async () => {
      if (username.length >= 3) {
        const available = await checkUsernameAvailability(username);
        setIsAvailable(available);
      } else {
        setIsAvailable(null);
      }
    };
    const delay = setTimeout(check, 500); // debounce
    return () => clearTimeout(delay);
  }, [formData.username]);


  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    console.log('Changed:', e.target.name, e.target.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const registerData = await register(formData)
    if (registerData.success) {
      props.onLoginChange(true);
    } else {
      setError('Registration failed')
    }

  };

  return (
    <Card className="p-4 mx-auto mt-5" style={{ maxWidth: '450px' }}>
      <h3 className="text-center mb-3">Create Account</h3>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
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

        <FormGroup controlId="username">
          <Form.Label>Username</Form.Label>
          <FormControl
            type="text"
            value={formData.username}
            name='username'
            placeholder='Username'
            onChange={(e) => {
              const val = e.target.value;
              setFormData((prev) => ({ ...prev, username: val }));
              setUsername(val);
            }}
            isInvalid={isAvailable === false}
            isValid={isAvailable === true}
            required
          />
          {isAvailable === false && (
            <FormText className="text-danger">Username is taken</FormText>
          )}
          {isAvailable === true && (
            <FormText className="text-success">Username is available</FormText>
          )}
        </FormGroup>

        <Form.Group className="mb-4" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button variant="primary" type="submit" onClick={() => navigate('/verify-otp',{state:{email:formData.email}})}>
            Sign up
          </Button>
          <Button variant="secondary" onClick={() => navigate('/')}>
            Already have an account? Login
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default Register;
