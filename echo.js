const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ port: 8082 });

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    const msgStr = message.toString();
    console.log("Message Received: ", msgStr);

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(msgStr);
      }
    });
  });

  console.log("Client Connected");
  ws.send("Client Connected");
});

console.log(`WS server is ready`);
