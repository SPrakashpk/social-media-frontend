import PostCard from '../components/post/PostCard.jsx'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import react, { useEffect, useState } from 'react'
import { FaPhotoVideo, FaTimes } from 'react-icons/fa'
import { createPost, fetchFeedPosts, fetchExplorePosts, likePost, commentOnPost } from '../services/postService.js'
import { Card, Button, Image, Spinner, Tab, Tabs } from 'react-bootstrap';
import { getRecommendedUsers, followUser } from '../services/userService';

function RecommendedUsersRow() {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followed, setFollowed] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await getRecommendedUsers();
        setRecommendedUsers(res.data.data || []);
      } catch (err) {
        setRecommendedUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleFollow = async (id) => {
    try {
      await followUser(id);
      setFollowed((prev) => [...prev, id]);
    } catch {}
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 80 }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (!recommendedUsers.length) return null;

  return (
    <div className="mb-4 pb-2 border-bottom">
      <div className="d-flex flex-row overflow-auto" style={{ gap: 24 }}>
        {recommendedUsers.map((user) => (
          <Card key={user._id} className="shadow-sm border-0 me-2" style={{ minWidth: 180, maxWidth: 180 }}>
            <Card.Body className="d-flex flex-column align-items-center p-3">
              <Image src={user.avatar} roundedCircle style={{ width: 56, height: 56, objectFit: 'cover' }} className="mb-2" />
              <div className="fw-semibold mb-1">@{user.username}</div>
              <Button
                size="sm"
                variant={followed.includes(user._id) ? 'outline-secondary' : 'primary'}
                disabled={followed.includes(user._id)}
                onClick={() => handleFollow(user._id)}
                className="w-100"
              >
                {followed.includes(user._id) ? 'Following' : 'Follow'}
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}



const Feed = () => {
  const [showModal, setShowModal] = useState(false)
  const [postText, setPostText] = useState('');
  const [posts, setPosts] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [currentUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [activeTab, setActiveTab] = useState('feed');

  const fetchFeed = async () => {
    try {
      const res = await fetchFeedPosts(currentUser.id);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch feed posts:', err);
    }
  };

  const fetchExplore = async () => {
    try {
      const res = await fetchExplorePosts(currentUser.id);
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch explore posts:', err);
    }
  };

  useEffect(() => {
    if (activeTab === 'feed') {
      fetchFeed();
    } else if (activeTab === 'explore') {
      fetchExplore();
    }
  }, [activeTab]);

  const handleMediaChange = (e) => {
    setMediaFiles([...mediaFiles, ...Array.from(e.target.files)])
  }

  const handleRemoveMedia = (idx) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== idx))
  }

  const handlePost = async () => {
    if (!postText.trim()) return;
    setIsPosting(true);
    try {
      const newPost = await createPost({
        userId: currentUser.id,
        text: postText,
        mediaFiles: mediaFiles,
      });

      // Optional: update feed if needed (e.g., setPosts([newPost, ...posts]))

      setShowModal(false);
      setPostText('');
      setMediaFiles([]);
      fetchFeed();
    } catch (err) {
      console.error('Failed to create post:', err.message);
    }
    finally {
      setIsPosting(false);
    }
  };


  return (
   <div className="feed px-3">
  <Card className="mb-4">
    <Card.Body className="d-flex align-items-center gap-2">
      <Form.Control
        as={'textarea'}
        rows={3}
        placeholder="What's on your mind?"
        className="me-2"
        onClick={() => setShowModal(true)}
        readOnly
      />
      <Button variant="primary" onClick={() => setShowModal(true)}>Post</Button>
    </Card.Body>
  </Card>

  <Tabs
    activeKey={activeTab}
    onSelect={k => setActiveTab(k)}
    id="feed-tabs"
    className="mb-3"
  >
    <Tab eventKey="feed" title="Your Feed">
      {posts.length === 0 ? (
        <p className="text-muted">No posts yet.</p>
      ) : (
        posts.map((post, idx) => (
          <PostCard
            key={idx}
            {...post}
            onLike={async () => {
              try {
                await likePost(post._id);
                setPosts(posts => posts.map((p, i) => i === idx ? {
                  ...p,
                  likes: p.likes.includes(currentUser.id)
                    ? p.likes.filter(id => id !== currentUser.id)
                    : [...p.likes, currentUser.id]
                } : p));
              } catch (err) {
                console.error('Failed to like post:', err);
              }
            }}
            onComment={async () => {
              const text = prompt('Enter your comment:');
              if (!text) return;
              try {
                const newComment = await commentOnPost(post._id, text);
                setPosts(posts => posts.map((p, i) => i === idx ? {
                  ...p,
                  comments: [...p.comments, newComment]
                } : p));
              } catch (err) {
                console.error('Failed to comment:', err);
              }
            }}
          />
        ))
      )}
    </Tab>
    <Tab eventKey="explore" title="Explore">
      {/* Recommended Users Row */}
      {posts.length === 0 ? (
        <p className="text-muted">No explore posts yet.</p>
      ) : (
        posts.map((post, idx) => (
          <PostCard
            key={idx}
            {...post}
            onLike={async () => {
              try {
                await likePost(post._id);
                setPosts(posts => posts.map((p, i) => i === idx ? {
                  ...p,
                  likes: p.likes.includes(currentUser.id)
                    ? p.likes.filter(id => id !== currentUser.id)
                    : [...p.likes, currentUser.id]
                } : p));
              } catch (err) {
                console.error('Failed to like post:', err);
              }
            }}
            onComment={async () => {
              const text = prompt('Enter your comment:');
              if (!text) return;
              try {
                const newComment = await commentOnPost(post._id, text);
                setPosts(posts => posts.map((p, i) => i === idx ? {
                  ...p,
                  comments: [...p.comments, newComment]
                } : p));
              } catch (err) {
                console.error('Failed to comment:', err);
              }
            }}
          />
        ))
      )}
    </Tab>

  </Tabs>

  <Modal show={showModal} onHide={() => setShowModal(false)} centered>
    <Modal.Header closeButton>
      <Modal.Title>Create Post</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form.Control
        as="textarea"
        rows={6}
        placeholder="What's on your mind?"
        value={postText}
        onChange={e => setPostText(e.target.value)}
        className="mb-3"
      />
      <div className="mb-3">
        <Form.Label>
          <Button variant="outline-secondary" as="span">
            <FaPhotoVideo className="me-2" />
            Add Media
          </Button>
          <Form.Control
            type="file"
            multiple
            accept="image/*,video/*"
            style={{ display: 'none' }}
            onChange={handleMediaChange}
          />
        </Form.Label>
      </div>
      <div className="d-flex flex-wrap gap-2 mb-3">
        {mediaFiles.map((file, idx) => (
          <div key={idx} style={{ position: 'relative', width: 100, height: 100 }}>
            {file.type.startsWith('image') ? (
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
              />
            ) : (
              <video
                src={URL.createObjectURL(file)}
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8 }}
                controls
              />
            )}
            <Button
              variant="danger"
              size="sm"
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                borderRadius: '50%',
                padding: 0,
                width: 24,
                height: 24,
              }}
              onClick={() => handleRemoveMedia(idx)}
            >
              <FaTimes />
            </Button>
          </div>
        ))}
      </div>
      <Button variant="primary" onClick={handlePost} disabled={isPosting} className="w-100">
        {isPosting ? (
          <>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
            Posting...
          </>
        ) : (
          'Post'
        )}
      </Button>
    </Modal.Body>
  </Modal>
</div>

  )
}

export default Feed
