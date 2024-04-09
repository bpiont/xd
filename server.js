const { Server } = require('socket.io');

// Deklaracja zmiennej przechowującej aktywne pokoje
const activeRooms = {};

module.exports = (req, res) => {
  if (!res.socket.server.io) {
    console.log('First use, starting socket.io');

    const io = new Server(res.socket.server);

    io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('disconnect', () => {
        console.log('Client disconnected');
        // Usunięcie użytkownika z pokoju, jeśli był w jakimś
        leaveRoom(socket);
      });

      socket.on('createRoom', () => {
        const roomId = generateRoomId();
        activeRooms[roomId] = { sockets: [socket.id] };
        socket.emit('roomCreated', roomId);
        console.log(`Room created: ${roomId}`);
      });

      socket.on('joinRoom', roomId => {
        if (activeRooms[roomId]) {
          activeRooms[roomId].sockets.push(socket.id);
          socket.join(roomId);
          console.log(`User joined room: ${roomId}`);
          socket.emit('joinedRoom', roomId);
        } else {
          console.log(`Room ${roomId} does not exist`);
          socket.emit('roomNotExist');
        }
      });

      socket.on('offer', offer => {
        socket.to(offer.roomId).emit('offer', offer);
      });

      socket.on('answer', answer => {
        socket.to(answer.roomId).emit('answer', answer);
      });

      socket.on('candidate', candidate => {
        socket.to(candidate.roomId).emit('candidate', candidate);
      });
    });
  }

  res.end();
};

function leaveRoom(socket) {
  for (const roomId in activeRooms) {
    if (activeRooms.hasOwnProperty(roomId)) {
      const index = activeRooms[roomId].sockets.indexOf(socket.id);
      if (index !== -1) {
        activeRooms[roomId].sockets.splice(index, 1);
        socket.leave(roomId);
        console.log(`User left room: ${roomId}`);
        if (activeRooms[roomId].sockets.length === 0) {
          delete activeRooms[roomId];
          console.log(`Room ${roomId} removed`);
        }
        break;
      }
    }
  }
}

function generateRoomId() {
  return Math.random().toString(36).substring(2, 8);
}

