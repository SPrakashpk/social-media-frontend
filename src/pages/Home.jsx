import PostCard from '../components/post/PostCard'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

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

const Home = () => (
  <div className="feed  px-3">
    <Card className="mb-4 ">
      <Card.Body className="d-flex align-items-center gap-2">
        <Form.Control as={'textarea'} rows={3} placeholder="What\'s on your mind?" className="me-2" />
        <Button variant="primary">Post</Button>
      </Card.Body>
    </Card>
    {posts.map((post, idx) => (
      <PostCard key={idx} {...post} />
    ))}
  </div>
)

export default Home
