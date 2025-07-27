import React from 'react'
import { Container, Row, Col, Button, Image } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()

    return (
        <div style={{ minHeight: '100vh', background: '#f8f9fa', marginTop: '73px' }}>
            <Container className="py-5">
                {/* Hero Section */}
                <Row className="align-items-center mb-5">
                    <Col md={6}>
                        <h1 className="display-4 fw-bold">Welcome to Chirp</h1>
                        <p className="lead text-muted mt-3">
                            Share your thoughts, connect with friends, and explore what the world is chirping about.
                        </p>
                        <div className="mt-4 d-flex gap-3">
                            <Button variant="primary" onClick={() => navigate('/signup')}>Get Started</Button>
                            <Button variant="outline-secondary" onClick={() => navigate('/login')}>Login</Button>
                        </div>
                    </Col>
                    <Col md={6}>
                        <Image
                            src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/chirp_chat.png"
                            alt="Social media graphic"
                            fluid
                            rounded
                        />
                    </Col>
                </Row>

                {/* Features Section */}
                <Row className="text-center">
                    <h2 className="mb-4">Why Chirp?</h2>
                    <Col md={4} className="mb-4">
                        <h5>📸 Media Sharing</h5>
                        <p className="text-muted">Upload photos and videos to express yourself freely.</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>💬 Real-Time Chat</h5>
                        <p className="text-muted">Chat instantly with your followers and friends.</p>
                    </Col>
                    <Col md={4} className="mb-4">
                        <h5>🔔 Notifications</h5>
                        <p className="text-muted">Stay updated with likes, comments, and mentions.</p>
                    </Col>
                </Row>

                {/* Footer */}
                <Row className="mt-5 text-center text-muted">
                    <Col>
                        <small>© {new Date().getFullYear()} Chirp. All rights reserved.</small>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default LandingPage
