import PostCard from '../components/post/PostCard.jsx'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useState } from 'react'
import { FaPhotoVideo, FaTimes } from 'react-icons/fa'
import { createPost } from '../services/postService.js'
import { Spinner } from 'react-bootstrap'

const posts = [
  {
    "_id": "i7V7Z7aaL9XK",
    "userId": {
      "_id": "SiItjsSwPp88",
      "name": "Ganesh S",
      "avatar": ""
    },
    "text": `🌀 “Gargantua — the monstrous black hole bending space, time, and minds.”
An awe-inspiring visualization of physics at its limits, crafted with real equations and cinematic genius.
#Interstellar #Gargantua #BlackHole #SpaceTime #ChristopherNolan #Astrophysics`,
    "media": [
      {
        "url": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "key": "posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "type": "image",
        "_id": "5gc0Lzyqk62j",
        "signedUrl": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZ45SVJOKCZ3QKS4%2F20250720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T172845Z&X-Amz-Expires=3600&X-Amz-Signature=d88ce63ad9ae06722fc8fd40bed3d6774b74ea65932aaa37cca1f7137393fafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      },
      {
        "url": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "key": "posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "type": "image",
        "_id": "5gc0Lzyqk62j",
        "signedUrl": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZ45SVJOKCZ3QKS4%2F20250720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T172845Z&X-Amz-Expires=3600&X-Amz-Signature=d88ce63ad9ae06722fc8fd40bed3d6774b74ea65932aaa37cca1f7137393fafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      },
      {
        "url": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "key": "posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "type": "image",
        "_id": "5gc0Lzyqk62j",
        "signedUrl": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZ45SVJOKCZ3QKS4%2F20250720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T172845Z&X-Amz-Expires=3600&X-Amz-Signature=d88ce63ad9ae06722fc8fd40bed3d6774b74ea65932aaa37cca1f7137393fafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      },
      {
        "url": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "key": "posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "type": "image",
        "_id": "5gc0Lzyqk62j",
        "signedUrl": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZ45SVJOKCZ3QKS4%2F20250720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T172845Z&X-Amz-Expires=3600&X-Amz-Signature=d88ce63ad9ae06722fc8fd40bed3d6774b74ea65932aaa37cca1f7137393fafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      },
      {
        "url": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "key": "posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "type": "image",
        "_id": "5gc0Lzyqk62j",
        "signedUrl": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZ45SVJOKCZ3QKS4%2F20250720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T172845Z&X-Amz-Expires=3600&X-Amz-Signature=d88ce63ad9ae06722fc8fd40bed3d6774b74ea65932aaa37cca1f7137393fafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      },

    ],
    "likes": [
      "4JXdbeCMJ5ZD"
    ],
    "comments": [
      {
        "_id": "kN1oxHbdjZ5b",
        "postId": "i7V7Z7aaL9XK",
        "userId": {
          "_id": "4JXdbeCMJ5ZD",
          "name": "Prakash S",
          "avatar": ""
        },
        "text": "test comment 3",
        "createdAt": "2025-07-20T03:10:41.500Z",
        "updatedAt": "2025-07-20T03:10:41.500Z",
        "__v": 0
      },
      {
        "_id": "dfzSho0r3eeY",
        "postId": "i7V7Z7aaL9XK",
        "userId": {
          "_id": "4JXdbeCMJ5ZD",
          "name": "Prakash S",
          "avatar": ""
        },
        "text": "test comment 2- nice post!!!",
        "createdAt": "2025-07-20T03:10:27.633Z",
        "updatedAt": "2025-07-20T03:10:27.633Z",
        "__v": 0
      }
    ],
    "createdAt": "2025-07-20T03:09:41.091Z",
    "updatedAt": "2025-07-20T03:11:31.987Z",
    "__v": 3
  },
  // ...more posts
  {
    "_id": "i7V7Z7aaL9XK",
    "userId": {
      "_id": "SiItjsSwPp88",
      "name": "Prakash Sundaramoorthy",
      "avatar": ""
    },
    "text": `rafted with real equations and cinematic genius.
 #Astrophysics`,
    "media": [
      {
        "url": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "key": "posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg",
        "type": "image",
        "_id": "5gc0Lzyqk62j",
        "signedUrl": "https://chirp-social-media.s3.eu-north-1.amazonaws.com/posts/1752980978027_interstellar-gargantua-u4-1920x1200.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAYZ45SVJOKCZ3QKS4%2F20250720%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Date=20250720T172845Z&X-Amz-Expires=3600&X-Amz-Signature=d88ce63ad9ae06722fc8fd40bed3d6774b74ea65932aaa37cca1f7137393fafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
      },


    ],
    "likes": [
      "4JXdbeCMJ5ZD"
    ],
    "comments": [
      {
        "_id": "kN1oxHbdjZ5b",
        "postId": "i7V7Z7aaL9XK",
        "userId": {
          "_id": "4JXdbeCMJ5ZD",
          "name": "Prakash S",
          "avatar": ""
        },
        "text": "test comment 3",
        "createdAt": "2025-07-20T03:10:41.500Z",
        "updatedAt": "2025-07-20T03:10:41.500Z",
        "__v": 0
      },
      {
        "_id": "dfzSho0r3eeY",
        "postId": "i7V7Z7aaL9XK",
        "userId": {
          "_id": "4JXdbeCMJ5ZD",
          "name": "Prakash S",
          "avatar": ""
        },
        "text": "test comment 2- nice post!!!",
        "createdAt": "2025-07-20T03:10:27.633Z",
        "updatedAt": "2025-07-20T03:10:27.633Z",
        "__v": 0
      }
    ],
    "createdAt": "2025-07-20T03:09:41.091Z",
    "updatedAt": "2025-07-20T03:11:31.987Z",
    "__v": 3
  },
]

const Feed = () => {
  const [showModal, setShowModal] = useState(false)
  const [postText, setPostText] = useState('')
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isPosting, setIsPosting] = useState(false);


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
        userId: 'SiItjsSwPp88',
        text: postText,
        mediaFiles: mediaFiles,
      });

      // Optional: update feed if needed (e.g., setPosts([newPost, ...posts]))

      setShowModal(false);
      setPostText('');
      setMediaFiles([]);
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
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton onClick={() => setShowModal(false)}>
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
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Posting...
              </>
            ) : (
              'Post'
            )}
          </Button>
        </Modal.Body>
      </Modal>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  )
}

export default Feed
