// server/socket.js
const socket = require('socket.io');
const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

// Store to keep track of users and their permissions
const users = new Map();

io.on('connection', (socket) => {
    console.log('New client connected');

    // When a user joins a document
    socket.on('join-document', async ({ documentId, userId }) => {
        try {
            // Fetch the document to check permissions
            const document = await Document.findById(documentId)
                .populate('permissions.user')
                .exec();

            if (!document) {
                socket.emit('error', 'Document not found');
                return;
            }

            // Check if user has permission to access this document
            const hasPermission = await checkDocumentPermission(document, userId);

            if (!hasPermission) {
                socket.emit('error', 'You do not have permission to access this document');
                return;
            }

            // Add user to the document's user list
            users.set(socket.id, { userId, documentId });

            // Broadcast that a new user has joined
            io.to(documentId).emit('user-joined', {
                userId: userId,
                username: (await User.findById(userId)).username
            });

        } catch (error) {
            socket.emit('error', 'Failed to join document');
            console.error(error);
        }
    });

    // Handle document updates
    socket.on('document:update', async ({ documentId, content, userId }) => {
        try {
            // Fetch the document to check permissions
            const document = await Document.findById(documentId)
                .populate('permissions.user')
                .exec();

            if (!document) {
                socket.emit('error', 'Document not found');
                return;
            }

            // Check if user has permission to edit
            const hasPermission = await checkDocumentPermission(document, userId, 'edit');

            if (!hasPermission) {
                socket.emit('error', 'You do not have permission to edit this document');
                return;
            }

            // Update the document
            const updatedDocument = await Document.findByIdAndUpdate(
                documentId,
                { $set: { content } },
                { new: true }
            );

            // Broadcast the update to all connected users in this document room
            io.to(documentId).emit('document-updated', {
                content: updatedDocument.content,
                lastUpdatedBy: userId
            });

        } catch (error) {
            socket.emit('error', 'Failed to update document');
            console.error(error);
        }
    });

    // Handle permission updates
    socket.on('update-permissions', async ({ documentId, permissions, userId }) => {
        try {
            // Only the document owner can update permissions
            const document = await Document.findById(documentId);
            if (document.owner.toString() !== userId) {
                socket.emit('error', 'You do not have permission to update permissions');
                return;
            }

            // Update document permissions
            const updatedDocument = await Document.findByIdAndUpdate(
                documentId,
                { $set: { permissions } },
                { new: true }
            );

            // Broadcast the permission update to all users in the document
            io.to(documentId).emit('permissions-updated', updatedDocument.permissions);

        } catch (error) {
            socket.emit('error', 'Failed to update permissions');
            console.error(error);
        }
    });

    socket.on('disconnect', () => {
        users.delete(socket.id);
    });
});