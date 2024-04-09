const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {};

app.use(express.static('public')); // Ustawienie folderu publicznego dla plików statycznych

app.get('/join/:roomId', (req, res) => {
    const roomId = req.params.roomId;
    res.sendFile(__dirname + '/public/join.html'); // Przekazanie klientowi pliku HTML dołączania do pokoju
});

io.on('connection', socket => {
    socket.on('offer', ({ roomId, offer }) => {
        io.to(roomId).emit('offer', offer); // Przekazywanie oferty do odpowiedniego pokoju
    });

    socket.on('answer', ({ roomId, answer }) => {
        io.to(roomId).emit('answer', answer); // Przekazywanie odpowiedzi do odpowiedniego pokoju
    });

    socket.on('candidate', ({ roomId, candidate }) => {
        io.to(roomId).emit('candidate', candidate); // Przekazywanie kandydata ICE do odpowiedniego pokoju
    });

    socket.on('disconnect', () => {
        // Logika obsługi rozłączenia użytkownika
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

