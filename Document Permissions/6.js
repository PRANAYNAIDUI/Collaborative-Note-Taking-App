// components/PermissionManager.js
import { useState } from 'react';
import { PERMISSIONS } from '../constants/permissions';

const PermissionManager = ({ documentId, currentPermissions }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPermissions, setNewPermissions] = useState(currentPermissions);

  const handlePermissionUpdate = async (userId, permissionLevel) => {
    try {
      await fetch(`/api/documents/${documentId}/permissions`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          permissionLevel,
        }),
      });
    } catch (error) {
      console.error('Failed to update permissions:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Manage Permissions</button>
      {isModalOpen && (
        <div className="modal">
          <h2>Document Permissions</h2>
          <div className="permission-list">
            {Object.entries(newPermissions).map(([userId, permission]) => (
              <div key={userId}>
                <span>User {userId}</span>
                <select
                  value={permission}
                  onChange={(e) => handlePermissionUpdate(userId, e.target.value)}
                >
                  <option value={PERMISSIONS.READ}>Read</option>
                  <option value={PERMISSIONS.WRITE}>Write</option>
                  <option value={PERMISSIONS.DELETE}>Delete</option>
                  <option value={PERMISSIONS.SHARE}>Share</option>
                </select>
              </div>
            ))}
          </div>
          <button onClick={() => setIsModalOpen(false)}>Close</button>
        </div>
      )}
    </div>
  );
};