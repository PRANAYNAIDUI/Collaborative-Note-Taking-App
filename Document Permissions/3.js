// contexts/DocumentContext.js
import { createContext, useState } from 'react';
import { PERMISSIONS } from '../constants/permissions';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [documentPermissions, setDocumentPermissions] = useState({});

  const checkPermission = (permission) => {
    if (!currentDocument || !documentPermissions) return false;
    return documentPermissions[permission] === permission;
  };

  return (
    <DocumentContext.Provider
      value={{
        currentDocument,
        setCurrentDocument,
        documentPermissions,
        setDocumentPermissions,
        checkPermission,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};