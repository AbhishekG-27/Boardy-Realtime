export const leaveRoom = (ws, clients, room) => {
  let clientId;
  clients.forEach((client) => {
    if (client.ws === ws) {
      clientId = client.clientId;
    }
  });
  room.forEach((room) => {
    if (room.members.includes(clientId)) {
      room.members = room.members.filter((member) => member !== clientId);
    }
  });
  clients.forEach((client) => {
    if (client.ws !== ws) {
      client.ws.send(
        JSON.stringify({ type: "leave-room", id: clientId, status: 200 })
      );
    }
  });
};
