// src/components/post/PostCard.jsx
import Card from 'react-bootstrap/Card'
import { FaRegThumbsUp, FaRegComment } from 'react-icons/fa'
import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = Math.floor((now - date) / 1000); // seconds
    if (diff < 60) return `${diff}s ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString();
}

const PostCard = (post) => {
    const { userId, text, media, likes, comments, createdAt, onLike, onComment } = post
    const timeString = useMemo(() => timeAgo(createdAt), [createdAt]);
    const navigate = useNavigate();

    const goToProfile = () => {
        if (userId?._id) {
            navigate(`/profile/${userId._id}`);
        }
    };

    return (
        <Card className="mb-4 post-card">
            <Card.Body>

                <div>
                    <span style={{ cursor: 'pointer' }} onClick={goToProfile}>
                        <img className='avatar' src="https://i.pravatar.cc/300" alt="" />
                    </span>
                    <span
                        className='name'
                        style={{ cursor: 'pointer', marginLeft: 8 }}
                        onClick={goToProfile}
                    >
                        <strong>{userId?.name}</strong>
                    </span>
                    <span className='follow'>follow</span>
                    <p className='time'>{timeString}</p>
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
                        onClick={onLike}
                    >
                        <FaRegThumbsUp className="me-1" />
                        <span>{likes.length}</span>
                    </div>
                    <div
                        className="ms-auto d-flex align-items-center"
                        style={{ cursor: 'pointer' }}
                        onClick={onComment}
                    >
                        <FaRegComment className="me-1" />
                        <span>{comments?.length ?? 0}</span>
                    </div>

                </div>
            </Card.Body>
        </Card>
    )
}

export default PostCard
