
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['my-custom-header'],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('Servidor WebSocket con Socket.IO funcionando!');
});

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado:', socket.id);

    socket.on('sendMessageToOtherClient', (message) => {
        console.log('Mensaje recibido de un cliente:', message);

        socket.broadcast.emit('receiveMessageFromOtherClient', message);
    });
    socket.on('AgreeOrder', (data) => {
        console.log('Mensaje:', data);
        socket.broadcast.emit('AgreeOrder', data);
    });
    socket.on('CancelOrder', (data) => {
        console.log('Mensaje:', data);
        socket.broadcast.emit('CancelOrder', data);
    });
    socket.on('OrderDelivered', (data) => {
        console.log('Mensaje:', data);
        socket.broadcast.emit('OrderDelivered', data);
    });
    socket.emit('message', '¡Bienvenido al servidor WebSocket!');

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(port, () => {
    console.log('Servidor WebSocket corriendo en http://localhost:8080');
});
