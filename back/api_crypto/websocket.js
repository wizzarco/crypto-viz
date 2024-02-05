const WebSocket = require('ws');

let wss = null;

// Initialisation de WebSocket Server
function initWebSocket(server) {
    wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Nouveau client WebSocket connecté');

        ws.on('message', (message) => {
            console.log('Message reçu:', message);
        });

        ws.on('close', () => {
            console.log('Client WebSocket déconnecté');
        });
    });
}

// Envoyer des données à tous les clients WebSocket
function sendWebSocketData(data) {
    if (!wss) return;

    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

module.exports = { initWebSocket, sendWebSocketData };
