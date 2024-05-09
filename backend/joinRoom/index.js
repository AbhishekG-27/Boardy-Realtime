export const joinRoom = (clients, room, ws, data) => {
  const roomId = data.roomId;
  let clientId;
  clients.forEach((client) => {
    if (client.ws === ws) {
      clientId = client.clientId;
    }
  });
  room.forEach((r) => {
    if (r.roomId === roomId) {
      if (r.members.includes(clientId)) {
        ws.send(
          JSON.stringify({
            type: "join-room",
            message: "Room already joined.",
          }),
          {
            binary: false,
          }
        );
        return;
      }
      r.members.push(clientId);
      ws.send(
        JSON.stringify({
          status: 200,
          lines: data.lines,
          rectngles: data.rectangles,
          circles: data.circles,
          arrows: data.arrows,
          texts: data.texts,
        })
      );
      r.members.forEach((member) => {
        clients.forEach((client) => {
          if (client.clientId === member && client.clientId !== clientId) {
            client.ws.send(
              JSON.stringify({
                type: "someone-joined-room",
                id: clientId,
              })
            );
          }
        });
      });
    }
  });
};
