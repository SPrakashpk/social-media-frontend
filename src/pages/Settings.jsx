import React, { useContext, useState } from 'react'
import { ThemeContext } from '../context/ThemeContext'
import { Container, Row, Col, ListGroup, Form, Button, Modal } from 'react-bootstrap'

const Settings = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const [showEditModal, setShowEditModal] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [isPrivate, setIsPrivate] = useState(false)

  const handleEditSave = () => {
    setShowEditModal(false)
    // Submit profile update here
  }

  return (
    <Container fluid className="pt-5">
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item active>General</ListGroup.Item>
            <ListGroup.Item>Account</ListGroup.Item>
            <ListGroup.Item>Privacy</ListGroup.Item>
            <ListGroup.Item>Notifications</ListGroup.Item>
          </ListGroup>
        </Col>

        {/* Main Settings Area */}
        <Col md={9}>
          <h4>Settings</h4>

          {/* Theme Toggle */}
          <Form.Group className="my-4 d-flex align-items-center justify-content-between">
            <Form.Label className="m-0">Dark Mode</Form.Label>
            <Form.Check
              type="switch"
              id="theme-switch"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
          </Form.Group>

          {/* Notifications Toggle */}
          <Form.Group className="my-4 d-flex align-items-center justify-content-between">
            <Form.Label className="m-0">Enable Notifications</Form.Label>
            <Form.Check
              type="switch"
              id="notif-switch"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(prev => !prev)}
            />
          </Form.Group>

          {/* Privacy Toggle */}
          <Form.Group className="my-4 d-flex align-items-center justify-content-between">
            <Form.Label className="m-0">Private Account</Form.Label>
            <Form.Check
              type="switch"
              id="privacy-switch"
              checked={isPrivate}
              onChange={() => setIsPrivate(prev => !prev)}
            />
          </Form.Group>

          {/* Edit Profile */}
          <div className="my-4">
            <Button variant="outline-primary" onClick={() => setShowEditModal(true)}>
              Edit Profile
            </Button>
          </div>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editUsername" className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="prakash_s" />
            </Form.Group>
            <Form.Group controlId="editBio" className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Your bio..." />
            </Form.Group>
            <Form.Group controlId="editProfilePic" className="mb-3">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control type="text" placeholder="https://..." />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Settings
