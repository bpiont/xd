const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', socket => {
    console.log('Client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });

    socket.on('offer', offer => {
        console.log('Received offer:', offer);
        socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', answer => {
        console.log('Received answer:', answer);
        socket.broadcast.emit('answer', answer);
    });

    socket.on('candidate', candidate => {
        console.log('Received ICE candidate:', candidate);
        socket.broadcast.emit('candidate', candidate);
    });
});

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
