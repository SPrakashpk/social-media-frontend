import React, { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import { ChatItem } from './ChatItem';
import { Modal, Button, Form } from 'react-bootstrap';
import { Plus } from 'lucide-react';

export const Sidebar = ({
  chats,
  currentUser,
  selectedChatId,
  searchQuery,
  onChatSelect,
  onSearchChange,
  followingUsers = [],
  onStartChat,
  onChatListRefresh,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [privateCandidates, setPrivateCandidates] = useState([]);
  const [privateCandidatesLoaded, setPrivateCandidatesLoaded] = useState(false);
  const [creatingPrivateChat, setCreatingPrivateChat] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);
  const [groupCandidates, setGroupCandidates] = useState([]);
  const [candidatesLoaded, setCandidatesLoaded] = useState(false);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const navigate = useNavigate();
  const { chatId } = useParams();

  const filteredChats = chats.filter(chat => {
    const otherUser = chat.members.find(m => m._id !== currentUser._id);
    const searchLower = searchQuery.toLowerCase();

    return (
      !searchQuery ||
      otherUser?.name.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    // Only fetch candidates once per modal open for group
    if (showGroupModal && !candidatesLoaded) {
      async function fetchCandidates() {
        try {
          const token = localStorage.getItem('chirp_token') || localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          const userId = currentUser._id || currentUser.id;
          const [followersRes, followingRes] = await Promise.all([
            fetch(`/api/users/${userId}/followers`, { headers }),
            fetch(`/api/users/${userId}/following`, { headers })
          ]);
          const followersData = await followersRes.json();
          const followingData = await followingRes.json();
          // Merge and deduplicate
          const all = [...(followersData.data || []), ...(followingData.data || [])];
          const unique = Object.values(all.reduce((acc, user) => {
            acc[user._id || user.id] = user;
            return acc;
          }, {}));
          let candidates = unique.filter(u => (u._id || u.id) !== userId);
          // Fallback to followingUsers prop if API returns empty
          if (candidates.length === 0 && followingUsers.length > 0) {
            candidates = followingUsers.filter(u => (u._id || u.id) !== userId);
          }
          setGroupCandidates(candidates);
        } catch {
          // Fallback to followingUsers prop if error
          const userId = currentUser._id || currentUser.id;
          setGroupCandidates(followingUsers.filter(u => (u._id || u.id) !== userId));
        }
        setCandidatesLoaded(true);
      }
      fetchCandidates();
    }
    // Only fetch candidates once per modal open for private chat
    if (showModal && !privateCandidatesLoaded) {
      async function fetchPrivateCandidates() {
        try {
          const token = localStorage.getItem('chirp_token') || localStorage.getItem('token');
          const headers = { Authorization: `Bearer ${token}` };
          const userId = currentUser._id || currentUser.id;
          const [followersRes, followingRes] = await Promise.all([
            fetch(`/api/users/${userId}/followers`, { headers }),
            fetch(`/api/users/${userId}/following`, { headers })
          ]);
          const followersData = await followersRes.json();
          const followingData = await followingRes.json();
          // Merge and deduplicate
          const all = [...(followersData.data || []), ...(followingData.data || [])];
          const unique = Object.values(all.reduce((acc, user) => {
            acc[user._id || user.id] = user;
            return acc;
          }, {}));
          let candidates = unique.filter(u => (u._id || u.id) !== userId);
          // Fallback to followingUsers prop if API returns empty
          if (candidates.length === 0 && followingUsers.length > 0) {
            candidates = followingUsers.filter(u => (u._id || u.id) !== userId);
          }
          setPrivateCandidates(candidates);
        } catch {
          // Fallback to followingUsers prop if error
          const userId = currentUser._id || currentUser.id;
          setPrivateCandidates(followingUsers.filter(u => (u._id || u.id) !== userId));
        }
        setPrivateCandidatesLoaded(true);
      }
      fetchPrivateCandidates();
    }
    // Reset loaded state when modal closes
    if (!showGroupModal && candidatesLoaded) {
      setCandidatesLoaded(false);
      setGroupCandidates([]);
    }
    if (!showModal && privateCandidatesLoaded) {
      setPrivateCandidatesLoaded(false);
      setPrivateCandidates([]);
    }
  }, [showGroupModal, candidatesLoaded, showModal, privateCandidatesLoaded, currentUser, followingUsers]);

  const handleCreateGroup = async () => {
    if (!groupName || groupMembers.length === 0) return;
    setCreatingGroup(true);
    try {
      const res = await fetch('/api/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('chirp_token') || localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: groupName,
          members: [...groupMembers, currentUser.id],
          createdBy: currentUser.id,
        }),
      });
      const data = await res.json();
      if (data.isGroup) {
        
        setShowGroupModal(false);
        setGroupName('');
        setGroupMembers([]);
        onChatListRefresh();
      }
      navigate(`/messages/${data._id}`);


    } catch (err) {
      // handle error
    }
    setCreatingGroup(false);
  };

  // Function to create private chat
  const handleCreatePrivateChat = async (user) => {
    setCreatingPrivateChat(true);
    try {
      const token = localStorage.getItem('chirp_token') || localStorage.getItem('token');
      const res = await fetch('/api/chat/createPrivateChat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: currentUser._id || currentUser.id,
          targetUserId: user._id || user.id,
        }),
      });
      const data = await res.json();
      if (data.data._id) {
        navigate(`/messages/${data.data._id}`);
        onChatListRefresh();
      }
      setShowModal(false);
    } catch (err) {
      // handle error
    }
    setCreatingPrivateChat(false);
  };

  return (
    <div className="chat-sidebar d-flex flex-column" style={{ width: '300px', height: '100vh', borderRight: '1px solid #ddd' }}>
      {/* Header */}
      <div className="chat-header p-3 border-bottom d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            src={currentUser.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'}
            alt={currentUser.name}
            className="rounded-circle me-3"
            width="40"
            height="40"
          />
          <div>
            <h6 className="mb-0">{currentUser.name}</h6>
            <small className="text-muted">Chats</small>
          </div>
        </div>
        <Button variant="outline-primary" size="sm" className="rounded-circle p-1 d-flex align-items-center justify-content-center" onClick={() => setShowModal(true)} title="New Chat">
          <Plus size={20} />
        </Button>
        <Button variant="outline-success" size="sm" className="rounded-circle p-1 ms-2 d-flex align-items-center justify-content-center" onClick={() => setShowGroupModal(true)} title="Create Group">
          Create Group
        </Button>
      </div>

      {/* Search */}
      <SearchBar searchQuery={searchQuery} onSearchChange={onSearchChange} />

      {/* Chat list */}
      <div className="flex-grow-1 overflow-auto">
        {filteredChats.length > 0 ? (
          filteredChats.map(chat => (
            <ChatItem
              key={chat._id}
              chat={chat}
              currentUser={currentUser}
              isSelected={chatId === chat._id}
              onClick={() => {
                navigate(`/messages/${chat._id}`);
                if (onChatSelect) onChatSelect(chat._id);
              }}
            />
          ))
        ) : (
          <div className="p-4 text-center text-muted">
            {searchQuery ? 'No chats found' : 'No chats available'}
          </div>
        )}
      </div>

      {/* Modal for new chat */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Start New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {privateCandidates.length === 0 ? (
            <div className="text-muted">No candidates available.</div>
          ) : (
            <ul className="list-unstyled">
              {privateCandidates.map(user => (
                <li key={user._id || user.id} className="d-flex align-items-center mb-2">
                  <img src={user.avatar || 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png'} alt={user.name} className="rounded-circle me-2" width="32" height="32" />
                  <span className="me-auto">{user.name}</span>
                  <Button size="sm" variant="primary" disabled={creatingPrivateChat} onClick={() => handleCreatePrivateChat(user)}>
                    {creatingPrivateChat ? 'Creating...' : 'Chat'}
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </Modal.Body>
      </Modal>

      {/* Modal for group creation */}
      <Modal show={showGroupModal} onHide={() => setShowGroupModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                placeholder="Enter group name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Add Members</Form.Label>
              <div style={{ maxHeight: 200, overflowY: 'auto', border: '1px solid #eee', borderRadius: 4, padding: 8 }}>
                {groupCandidates.length === 0 ? (
                  <div className="text-muted">No candidates available.</div>
                ) : (
                  groupCandidates.map(user => (
                    <Form.Check
                      key={user._id}
                      type="checkbox"
                      label={user.name}
                      checked={groupMembers.includes(user._id)}
                      onChange={e => {
                        if (e.target.checked) {
                          setGroupMembers(prev => [...prev, user._id]);
                        } else {
                          setGroupMembers(prev => prev.filter(id => id !== user._id));
                        }
                      }}
                    />
                  ))
                )}
              </div>
            </Form.Group>
            <Button variant="success" className="w-100" disabled={creatingGroup || !groupName || groupMembers.length === 0} onClick={handleCreateGroup}>
              {creatingGroup ? 'Creating...' : 'Create Group'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};
