import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { Search } from 'lucide-react';

export const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="p-3 border-bottom">
      <InputGroup>
        <InputGroup.Text className="bg-light border-end-0">
          <Search size={16} className="text-muted" />
        </InputGroup.Text>
        <Form.Control
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="border-start-0 bg-light"
        />
      </InputGroup>
    </div>
  );
};