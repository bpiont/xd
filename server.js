const io = require('socket.io')(server); // Assuming 'server' is your HTTP server instance

// Listen for connection from clients
io.on('connection', socket => {
    console.log('A user connected.');

    // Handle joining a room
    socket.on('joinRoom', roomId => {
        // Join the specified room
        socket.join(roomId);
        // Emit event to notify the client that they have successfully joined the room
        socket.emit('joinedRoom');
        console.log(`User joined room: ${roomId}`);
    });
});


