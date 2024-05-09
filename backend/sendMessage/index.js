export const sendMessage = (ws, data, clients, room) => {
  clients.forEach((client) => {
    room.forEach((room) => {
      if (client.ws === ws && room.members.includes(client.clientId)) {
        room.members.forEach((member) => {
          clients.forEach((client) => {
            if (client.clientId === member && client.ws !== ws) {
              client.ws.send(JSON.stringify(data));
            }
          });
        });
      }
    });
  });
};
