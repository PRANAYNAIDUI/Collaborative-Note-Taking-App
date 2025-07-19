import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
  margin: 10px 0;
`;

const PermissionLevelSelect = styled.select`
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const UserList = styled.div`
  margin-top: 20px;
`;

const UserItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
  background: #fff;
  border: 1px solid #eee;
  margin: 5px 0;
  border-radius: 4px;
`;

const PermissionManager = ({ documentId }) => {
  const [permissionLevel, setPermissionLevel] = useState('private');
  const [users, setUsers] = useState([]);
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`/api/documents/${documentId}/users`);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handlePermissionChange = async (level) => {
    try {
      await axios.patch(`/api/documents/${documentId}/permissions`, {
        permissionLevel: level
      });
      setPermissionLevel(level);
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const handleAddUser = async () => {
    if (!newEmail) return;

    try {
      await axios.post(`/api/documents/${documentId}/users`, {
        email: newEmail
      });
      setUsers([...users, { email: newEmail }]);
      setNewEmail('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      await axios.delete(`/api/documents/${documentId}/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error removing user:', error);
    }
  };

  return (
    <Container>
      <h3>Document Permissions</h3>
      
      <div>
        <label>Permission Level:</label>
        <PermissionLevelSelect 
          value={permissionLevel}
          onChange={(e) => handlePermissionChange(e.target.value)}
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
          <option value="shared">Shared</option>
        </PermissionLevelSelect>
      </div>

      <UserList>
        <h4>Shared With:</h4>
        {users.map(user => (
          <UserItem key={user._id}>
            <span>{user.email}</span>
            <button onClick={() => handleRemoveUser(user._id)}>
              Remove
            </button>
          </UserItem>
        ))}
        
        <div style={{ marginTop: '10px' }}>
          <input
            type="email"
            placeholder="Add new user by email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={handleAddUser}>
            Add User
          </button>
        </div>
      </UserList>
    </Container>
  );
};

export default PermissionManager;

## Integrating with Document View

Now let's integrate this component with our document view. We'll need to:

1. Import the PermissionManager component
2. Add it to our document view layout
3. Pass the document ID as a prop

### Updated DocumentView.jsx

```jsx
import React from 'react';
import DocumentEditor from './DocumentEditor';
import PermissionManager from './PermissionManager';

const DocumentView = ({ document }) => {
  return (
    <div>
      <h1>{document.title}</h1>
      <DocumentEditor document={document} />
      <PermissionManager documentId={document._id} />
    </div>
  );
};

export default DocumentView;