import React, { useEffect, useState } from 'react'
import { followUser, unfollowUser, getFollowers, getFollowing, getUserProfile } from '../services/userService'
import {
  Card, Button, Image, Row, Col, Container, Modal, Form
} from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'
import { sendMessage } from '../services/chatService'
import User from '../../../social-media-backend/src/models/User'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editData, setEditData] = useState({ name: '', bio: '', profilePic: '' });
  const [hover, setHover] = useState(false)
  const [showPicModal, setShowPicModal] = useState(false)
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [followersList, setFollowersList] = useState([]);
  const [followingList, setFollowingList] = useState([]);


  const navigate = useNavigate()
  // Get profileId from URL or props if needed, fallback to current user
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const userId = currentUser?.id;
  // For demo, assume viewing own profile; replace with route param if needed
  const { id: profileId } = useParams();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res = await getUserProfile(profileId);
        setUser(res.data.data);
        setPosts(res.data.data.posts || []);
        setFollowersCount(res.data.data.followers?.length || 0);
        setFollowingCount(res.data.data.following?.length || 0);
        setIsOwnProfile(profileId === userId);
        setIsFollowing(res.data.data.followers?.includes(userId));
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      }
    };
    fetchProfileData();
  }, [profileId, userId]);

  const handleFollow = async () => {
    try {
      await followUser(profileId);
      setIsFollowing(true);
      setFollowersCount(followersCount + 1);
    } catch (err) {
      console.error('Follow failed:', err);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(profileId);
      setIsFollowing(false);
      setFollowersCount(followersCount - 1);
    } catch (err) {
      console.error('Unfollow failed:', err);
    }
  };

  const handleMessage = async () => {
    try {
    const data = await sendMessage(currentUser.id, profileId, ''); // Empty message to just open chat
    navigate(`/chat/${data.chatId}`);
  } catch (err) {
    console.error("Failed to initiate chat:", err);
  }
  }

  const openFollowersModal = async () => {
    try {
      const res = await getFollowers(profileId);
      setFollowersList(res.data.data);
      setShowFollowersModal(true);
    } catch (err) {
      console.error('Failed to fetch followers:', err);
    }
  };

  const openFollowingModal = async () => {
    try {
      const res = await getFollowing(profileId);
      setFollowingList(res.data.data);
      setShowFollowingModal(true);
    } catch (err) {
      console.error('Failed to fetch following:', err);
    }
  };

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


  const DEFAULT_AVATAR = 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'

  const handleProfilePicUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      alert('Only image files are allowed.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be under 5MB.')
      return
    }

    const formData = new FormData()
    formData.append('profilePic', file)

    try {
      const token = localStorage.getItem('chirp_token')
      const res = await API.put('/users/me/upload-avatar', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      })

      setUser(prev => ({ ...prev, profilePic: res.data.profilePic }))
      setShowPicModal(false)
    } catch (err) {
      console.error('Upload failed:', err)
      alert('Failed to upload profile picture.')
    }
  }

  const handleRemoveProfilePic = async () => {
    try {
      const token = localStorage.getItem('chirp_token')
      const res = await API.put('/users/me/remove-avatar', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setUser(prev => ({ ...prev, profilePic: DEFAULT_AVATAR }))
      setShowPicModal(false)
    } catch (err) {
      console.error('Remove failed:', err)
      alert('Failed to remove profile picture.')
    }
  }





  if (!user) return <div className="text-center mt-5">Loading...</div>

  return (
    <Container className="py-4">
      <Button variant="link" onClick={() => navigate('/home')} className="mb-3">
        ← Back to Home
      </Button>

      <Card className="mb-4 p-4 shadow-sm border-0">
        <Row>
          <Col xs={12} md={3} className="text-center mb-3 mb-md-0 position-relative">
            {isOwnProfile?(<div
              className="position-relative d-inline-block"
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => setShowPicModal(true)}
              style={{ cursor: 'pointer' }}
            >
              <Image
                src={user.profilePic || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
                roundedCircle
                fluid
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />
              <div
                className="position-absolute top-50 start-50 translate-middle bg-dark bg-opacity-50 text-white rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  width: '120px',
                  height: '120px',
                  display: hover ? 'flex' : 'none',
                  fontSize: '16px',
                }}
              >
                Edit
              </div>
            </div>):(<Image
                src={user.profilePic || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
                roundedCircle
                fluid
                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
              />)}
          </Col>

          <Col xs={12} md={9}>
            <h4 className="mb-1">@{user.username}</h4>
            <h5 className="text-muted">{user.name}</h5>
            <p className="mt-2">{user.bio}</p>
            <div className="d-flex gap-4 mb-3">
              <span><strong>{posts.length}</strong> Posts</span>
              <span style={{ cursor: 'pointer' }} onClick={openFollowersModal}>
                <strong>{followersCount}</strong> Followers
              </span>
              <span style={{ cursor: 'pointer' }} onClick={openFollowingModal}>
                <strong>{followingCount}</strong> Following
              </span>
            </div>
            {isOwnProfile ? (
              <Button variant="primary" size="sm" onClick={handleEditClick}>
                Edit Profile
              </Button>
            ) : (
              <>
                {isFollowing ? (
                  <Button variant="outline-secondary" size="sm" onClick={handleUnfollow}>
                    Unfollow
                  </Button>
                ) : (
                  <Button variant="primary" size="sm" onClick={handleFollow}>
                    Follow
                  </Button>
                )}
                <Button variant="outline-primary" size="sm" className="ms-2" onClick={handleMessage}>
                  Message
                </Button>
              </>
            )}
            {/* Followers Modal */}
            <Modal show={showFollowersModal} onHide={() => setShowFollowersModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Followers</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {followersList.length === 0 ? (
                  <div className="text-muted">No followers yet.</div>
                ) : (
                  <ul className="list-unstyled">
                    {followersList.map(f => (
                      <Link to={`/profile/${f._id}`}>
                        <img src={f.avatar || DEFAULT_AVATAR} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 10 }} />
                        <span>@{f.username}</span>
                      </Link>

                    ))}
                  </ul>
                )}
              </Modal.Body>
            </Modal>

            {/* Following Modal */}
            <Modal show={showFollowingModal} onHide={() => setShowFollowingModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Following</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {followingList.length === 0 ? (
                  <div className="text-muted">Not following anyone yet.</div>
                ) : (
                  <ul className="list-unstyled">
                    {followingList.map(f => (
                      <Link to={`/profile/${f._id}`}>
                        <img src={f.avatar || DEFAULT_AVATAR} alt="avatar" style={{ width: 32, height: 32, borderRadius: '50%', marginRight: 10 }} />
                        <span>@{f.username}</span>
                      </Link>
                    ))}
                  </ul>
                )}
              </Modal.Body>
            </Modal>
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
      <Modal show={showPicModal} onHide={() => setShowPicModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <Image
              src={user.profilePic || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
              roundedCircle
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
          <Form.Group controlId="uploadPic">
            <Form.Label>Choose new profile picture</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleProfilePicUpload}
            />
            <Form.Text className="text-muted">
              Only images. Max size 5MB.
            </Form.Text>
          </Form.Group>
          {user.profilePic && user.profilePic !== DEFAULT_AVATAR && (
            <Button variant="danger" className="mt-3" onClick={handleRemoveProfilePic}>
              Remove Current Picture
            </Button>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPicModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  )
}

export default Profile
