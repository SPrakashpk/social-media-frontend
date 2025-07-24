// import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { Container, Row, Col, Button, Card, Image } from 'react-bootstrap'

// const Profile = () => {
//   const { userId } = useParams()
//   const [user, setUser] = useState(null)
//   const [posts, setPosts] = useState([])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = localStorage.getItem('token')
//         const resUser = await axios.get(`http://localhost:5000/api/users/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })

//         const resPosts = await axios.get(`http://localhost:5000/api/posts/user/${userId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         })

//         setUser(resUser.data)
//         setPosts(resPosts.data)
//       } catch (err) {
//         console.error(err)
//       }
//     }

//     fetchData()
//   }, [userId])

//   if (!user) return <div>Loading...</div>

//   return (
//     <Container className="pt-4">
//       <Row className="mb-4 align-items-center">
//         <Col xs={4} md={3} className="text-center">
//           <Image
//             src={user.profilePic || 'https://via.placeholder.com/150'}
//             roundedCircle
//             width={120}
//             height={120}
//             alt="Profile"
//           />
//         </Col>
//         <Col xs={8} md={6}>
//           <h4 className="mb-1">@{user.username}</h4>
//           <h6 className="text-muted">{user.name}</h6>
//           <p className="text-secondary">{user.bio || 'No bio available.'}</p>
//           <div className="d-flex gap-4 mt-2">
//             <div><strong>{posts.length}</strong> posts</div>
//             <div><strong>{user.followers?.length || 0}</strong> followers</div>
//             <div><strong>{user.following?.length || 0}</strong> following</div>
//           </div>
//         </Col>
//         <Col xs={12} md={3} className="text-md-end mt-3 mt-md-0">
//           <Button variant="outline-primary">Edit Profile</Button>
//         </Col>
//       </Row>

//       <hr />

//       {/* Posts Grid */}
//       <Row className="g-3">
//         {posts.map((post) => (
//           <Col key={post._id} xs={6} md={4} lg={3}>
//             <Card>
//               {post.media?.[0]?.signedUrl && (
//                 <Card.Img
//                   variant="top"
//                   src={post.media[0].signedUrl}
//                   style={{ height: '200px', objectFit: 'cover' }}
//                 />
//               )}
//               <Card.Body className="p-2">
//                 <Card.Text className="text-truncate mb-0">{post.text}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   )
// }

// export default Profile





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
