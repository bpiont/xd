const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const rooms = {}; // Przechowuje informacje o istniejących pokojach

io.on('connection', socket => {
    // Obsługa zdarzenia tworzenia nowego pokoju
    socket.on('createRoom', () => {
        const roomId = generateRoomId(); // Funkcja generująca unikalny identyfikator pokoju
        rooms[roomId] = { users: [socket.id] }; // Dodajemy pierwszego użytkownika do nowego pokoju
        socket.join(roomId); // Dołączamy użytkownika do pokoju
        socket.emit('roomCreated', roomId); // Informujemy użytkownika o utworzeniu pokoju i przekazujemy identyfikator
    });

    // Obsługa zdarzenia dołączania do istniejącego pokoju
    socket.on('joinRoom', roomId => {
        if (rooms[roomId]) {
            rooms[roomId].users.push(socket.id); // Dodajemy użytkownika do istniejącego pokoju
            socket.join(roomId); // Dołączamy użytkownika do pokoju
            io.to(roomId).emit('userJoined', socket.id); // Informujemy wszystkich użytkowników w pokoju o dołączeniu nowego użytkownika
        } else {
            // Obsługa sytuacji, gdy podany identyfikator pokoju nie istnieje
            socket.emit('roomNotFound');
        }
    });

    // Obsługa rozłączenia użytkownika
    socket.on('disconnect', () => {
        // Szukamy pokoju, do którego użytkownik należał
        for (const roomId in rooms) {
            if (rooms[roomId].users.includes(socket.id)) {
                // Usuwamy użytkownika z listy użytkowników w pokoju
                rooms[roomId].users = rooms[roomId].users.filter(userId => userId !== socket.id);
                // Jeśli nie ma już żadnych użytkowników w pokoju, usuwamy pokój
                if (rooms[roomId].users.length === 0) {
                    delete rooms[roomId];
                } else {
                    // Jeśli są jeszcze inni użytkownicy w pokoju, informujemy ich o odejściu użytkownika
                    io.to(roomId).emit('userLeft', socket.id);
                }
                break;
            }
        }
    });
});

// Funkcja generująca unikalny identyfikator pokoju
function generateRoomId() {
    return Math.random().toString(36).substr(2, 8).toUpperCase(); // Możesz dostosować długość identyfikatora
}

// Start serwera
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

