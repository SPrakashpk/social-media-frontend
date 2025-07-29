import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axios';
import { Form, Button, Card, Alert, Container } from 'react-bootstrap';
import { configDotenv } from 'dotenv';

// <-- Get email passed from Register


const OtpVerify = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || ''; // passed from login or signup page

    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const resendOTP = async (e) => {
        e.preventDefault(); // ✅ Prevent form reload

        if (!email) return alert("Email is missing!");

        try {
            const res = await fetch('http://localhost:5000/api/auth/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to resend OTP');

            console.log('OTP resent successfully:', data.message);
            setSuccess('OTP resent successfully');
            setError('');
        } catch (err) {
            console.error('Resend OTP error:', err.message);
            setError(err.message);
            setSuccess('');
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/verify-otp', { email, otp });
            setSuccess('OTP Verified Successfully!');
            setTimeout(() => {
                navigate('/profile'); // Or wherever you want
            }, 1000);
        } catch (err) {
            setError(err.response?.data?.message || 'Verification failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <Card style={{ width: '24rem' }} className="p-4 shadow">
                <Card.Body>
                    <Card.Title className="mb-4">Verify OTP</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>OTP sent to {email}</Form.Label>
                            <Form.Control
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Enter OTP"
                                required
                            />
                        </Form.Group>
                        <Button variant='dark' onClick={resendOTP}>Resen OTP</Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? 'Verifying...' : 'Verify'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default OtpVerify;
