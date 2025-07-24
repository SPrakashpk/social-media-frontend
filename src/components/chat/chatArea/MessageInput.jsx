import React, { useState, useRef } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Send, Paperclip, Smile } from 'lucide-react';

export const MessageInput = ({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  };

  return (
    <div className="message-input-container">
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Button variant="outline-secondary" disabled={disabled} className="border-end-0">
            <Paperclip size={18} />
          </Button>
          
          <div className="position-relative flex-grow-1">
            <Form.Control
              as="textarea"
              ref={textareaRef}
              value={message}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={disabled}
              className="message-input border-start-0 border-end-0"
              rows={1}
              style={{ resize: 'none', maxHeight: '120px' }}
            />
            <Button
              variant="link"
              className="position-absolute top-50 end-0 translate-middle-y text-muted"
              disabled={disabled}
              style={{ border: 'none', background: 'none' }}
            >
              <Smile size={16} />
            </Button>
          </div>
          
          <Button
            type="submit"
            disabled={!message.trim() || disabled}
            className="send-button border-start-0"
          >
            <Send size={18} />
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
};