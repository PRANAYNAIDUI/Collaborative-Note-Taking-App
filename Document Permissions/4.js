// components/DocumentEditor.js
import { useContext } from 'react';
import { DocumentContext } from '../contexts/DocumentContext';
import { PERMISSIONS } from '../constants/permissions';

const DocumentEditor = () => {
  const { currentDocument, checkPermission } = useContext(DocumentContext);

  if (!currentDocument) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{currentDocument.title}</h1>
      <textarea
        value={currentDocument.content}
        onChange={(e) => {
          if (checkPermission(PERMISSIONS.WRITE)) {
            // Update document content
          }
        }}
      />
    </div>
  );
};