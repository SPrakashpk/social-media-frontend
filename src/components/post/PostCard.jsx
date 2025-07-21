// src/components/post/PostCard.jsx
import Card from 'react-bootstrap/Card'
import { FaRegThumbsUp, FaRegComment } from 'react-icons/fa'

const PostCard = (post) => {
    console.log('post---', post)
    const { userId, text, media, likes, comments, createdAt } = post

    return (
        <Card className="mb-4 post-card">
            <Card.Body>

                <div>
                    <span> <img className='avatar' src="https://i.pravatar.cc/300" alt="" /> </span>
                    <span className='name'><strong>{userId?.name}</strong></span>
                    <span className='follow'>follow</span>
                    <p className='time'>3hr</p>
                </div>

                {text && <div className="mb-2 text-content">{text}</div>}

                <div className="media-container">
                    {media?.length > 0 && (
                        <div className="media-grid">
                            {media.slice(0, 4).map((mediaItem, idx) => (
                                <div key={idx} className={`media-item media-item-${Math.min(media.length, 4)}-${idx} ${media.length >= 4 ? 'media-item-4' : ''
                                    }`}>
                                    <img
                                        src={mediaItem.signedUrl}
                                        alt={`media-${idx}`}
                                        className="img-fluid rounded"
                                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    />
                                    {/* Overlay for +N */}
                                    {idx === 3 && media.length > 4 && (
                                        <div className="media-overlay">
                                            +{media.length - 4}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="d-flex" style={{ marginTop: '10px' }}>
                    <div
                        className="me-auto d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => alert('Like clicked')}
                    >
                        <FaRegThumbsUp className="me-1" />
                        <span onClick={() => alert('Like count clicked')}>{likes.length}</span>
                    </div>
                    <div
                        className="ms-auto d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={() => alert('Comment icon clicked')}
                    >
                        <FaRegComment className="me-1" />
                        <span onClick={() => alert('Comment count clicked')}>{comments?.length ?? 0}</span>
                    </div>

                </div>
            </Card.Body>
        </Card>
    )
}

export default PostCard
