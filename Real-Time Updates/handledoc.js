  const handleDocumentUpdate = (newContent) => {
    if (isEditing) {
      // If user is editing, show confirmation dialog
      if (confirm('You have unsaved changes. Do you want to discard them?')) {
        setDocumentContent(newContent);
        setIsEditing(false);
      }
    } else {
      setDocumentContent(newContent);
    }
    setLatestContent(newContent);
  };
