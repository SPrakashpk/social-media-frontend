import React, { useEffect, useState } from 'react'
import {
  Card, Button, Image, Row, Col, Container, Modal, Form
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const mockUser = {
  _id: 'SiItjsSwPp88',
  username: 'prakash_s',
  name: 'Prakash S',
  bio: 'CSE Graduate | Building Chirp 🚀',
  profilePic: 'https://via.placeholder.com/100',
  followers: ['u1', 'u2', 'u3'],
  following: ['u4', 'u5'],
}

const mockPosts = [
  {
    _id: 'post1',
    text: 'This is my first post!',
    media: [{ signedUrl: 'https://via.placeholder.com/300x200' }],
    createdAt: '2025-07-20T10:00:00Z',
    likes: ['u1', 'u2'],
    comments: ['c1']
  },
  {
    _id: 'post2',
    text: 'Enjoying the Chirp project ✨',
    media: [],
    createdAt: '2025-07-18T15:20:00Z',
    likes: ['u3'],
    comments: []
  },
]

const Profile = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState({
    name: '',
    bio: '',
    profilePic: '',
  })

  const navigate = useNavigate()

  useEffect(() => {
    setUser(mockUser)
    setPosts(mockPosts)
  }, [])

  const handleEditClick = () => {
    setEditData({
      name: user.name,
      bio: user.bio,
      profilePic: user.profilePic,
    })
    setShowModal(true)
  }

  const handleSaveChanges = () => {
    setUser(prev => ({
      ...prev,
      name: editData.name,
      bio: editData.bio,
      profilePic: editData.profilePic,
    }))
    setShowModal(false)
  }

  if (!user) return <div className="text-center mt-5">Loading...</div>

  return (
    <Container className="py-4">
      {/* Back Button */}
      <Button variant="link" onClick={() => navigate('/')} className="mb-3">
        ← Back to Home
      </Button>

      {/* Profile Card */}
      <Card className="mb-4 p-4 shadow-sm border-0">
        <Row>
          <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
            <Image
              src={user.profilePic}
              roundedCircle
              fluid
              style={{ width: '120px', height: '120px' }}
            />
          </Col>
          <Col xs={12} md={9}>
            <h4 className="mb-1">@{user.username}</h4>
            <h5 className="text-muted">{user.name}</h5>
            <p className="mt-2">{user.bio}</p>
            <div className="d-flex gap-4 mb-3">
              <span><strong>{posts.length}</strong> Posts</span>
              <span><strong>{user.followers.length}</strong> Followers</span>
              <span><strong>{user.following.length}</strong> Following</span>
            </div>
            <Button variant="primary" size="sm" onClick={handleEditClick}>
              Edit Profile
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Posts */}
      <h5 className="mb-3">Posts</h5>
      {posts.length > 0 ? posts.map(post => (
        <Card key={post._id} className="mb-3 p-3 shadow-sm border-0">
          <p>{post.text}</p>
          
          {post.media.length > 0 && (
            <div className="d-flex flex-wrap gap-3 mt-2">
              {post.media.map((mediaItem, idx) => (
                <img
                  key={idx}
                  src={mediaItem.signedUrl}
                  alt="media"
                  style={{
                    width: '240px',
                    height: '160px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
              ))}
            </div>
          )}
          <div className="text-muted small mt-2">
  ❤️ {post.likes.length} &nbsp;&nbsp; 💬 {post.comments.length}
</div>

        </Card>
      )) : <p className="text-muted">No posts yet.</p>}

      {/* Edit Profile Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editBio" className="mb-3">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editData.bio}
                onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="editProfilePic" className="mb-3">
              <Form.Label>Profile Picture URL</Form.Label>
              <Form.Control
                type="text"
                value={editData.profilePic}
                onChange={(e) => setEditData({ ...editData, profilePic: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}

export default Profile
