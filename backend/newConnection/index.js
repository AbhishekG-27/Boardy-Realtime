export const newConnection = (clients, ws) => {
  const clientId = Math.random().toString(36).substring(2, 9);
  clients.push({ ws, clientId });

  clients.forEach((client) => {
    if (client.ws === ws) {
      client.ws.send(
        JSON.stringify({
          message: client.clientId,
          type: "id",
        }),
        { binary: false }
      );
    }
  });
};
