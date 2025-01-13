const WebSocket = require("ws");

// Crear un servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", (ws) => {
    console.log("Un cliente se ha conectado.");

    // Escuchar mensajes de un cliente
    ws.on("message", (message) => {
        console.log("Mensaje recibido:", message);

        // Reenviar el mensaje a todos los clientes conectados
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("Un cliente se ha desconectado.");
    });
});

console.log("Servidor WebSocket corriendo en ws://localhost:8080");
