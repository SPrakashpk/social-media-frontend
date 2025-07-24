import React, { useEffect, useState } from 'react'
import {
  Card, Button, Image, Row, Col, Container, Modal, Form
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import API from '../api/axios'

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
  const userId = (JSON.parse(localStorage.getItem('user'))).id

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('chirp_token')
        const res = await API.get('/users/profile-details', {
          // headers: {
          //   Authorization: `Bearer ${token}`,
          // },
          params: {
            id: userId,
          },
        })

        setUser(res.data.data)
        setPosts(res.data.data.posts)
      } catch (err) {
        console.error('Failed to fetch profile data:', err)
        navigate('/login')
      }
    }

    fetchProfileData()
  }, [navigate])

  const handleEditClick = () => {
    setEditData({
      name: user.name || '',
      bio: user.bio || '',
      profilePic: user.profilePic || '',
    })
    setShowModal(true)
  }

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('chirp_token')
      const updated = {
        name: editData.name,
        bio: editData.bio,
        profilePic: editData.profilePic,
      }

      const res = await API.put('/users/me', updated, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setUser((prev) => ({ ...prev, ...res.data }))
      setShowModal(false)
    } catch (err) {
      console.error('Failed to update profile:', err)
    }
  }

  if (!user) return <div className="text-center mt-5">Loading...</div>

  return (
    <Container className="py-4">
      <Button variant="link" onClick={() => navigate('/')} className="mb-3">
        ← Back to Home
      </Button>

      <Card className="mb-4 p-4 shadow-sm border-0">
        <Row>
          <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
            <Image
              src={user.profilePic || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
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
              <span><strong>{user.postCount}</strong> Posts</span>
              <span><strong>{user.followersCount}</strong> Followers</span>
              <span><strong>{user.followingCount}</strong> Following</span>
            </div>
            <Button variant="primary" size="sm" onClick={handleEditClick}>
              Edit Profile
            </Button>
          </Col>
        </Row>
      </Card>

      <h5 className="mb-3">Posts</h5>
      {posts.length > 0 ? posts.map(post => (
        <Card key={post._id} className="mb-3 p-3 shadow-sm border-0">
          <p>{post.text}</p>

          {post.media && post.media.length > 0 && (
            <div className="d-flex flex-wrap gap-3 mt-2">
              {post.media.map((mediaItem, idx) => (
                <img
                  key={mediaItem.key || idx}
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
