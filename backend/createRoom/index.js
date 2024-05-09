export const createRoom = (clients, room, ws) => {
  const roomId = Math.random().toString(36).substring(2, 9);
  clients.forEach((client) => {
    if (client.ws === ws) {
      room.push({ roomId: roomId, members: [client.clientId] });
      ws.send(JSON.stringify({ type: "room-created", roomId: roomId }), {
        binary: false,
      });
      // console.log(room);
    }
  });
};
