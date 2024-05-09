// index.js
import { WebSocketServer } from "ws";
import express from "express";
import { newConnection } from "./newConnection/index.js";
import { createRoom } from "./createRoom/index.js";
import { joinRoom } from "./joinRoom/index.js";
import { sendMessage } from "./sendMessage/index.js";
import { leaveRoom } from "./leaveRoom/index.js";

const app = express();

app.get("/*", (req, res) => {
  res.send("Server running on port 8000 .");
});

const server = app.listen(8000, () => {
  console.log("Server running on port 8000.");
});

const wss = new WebSocketServer({ server });

const clients = [];
let room = [];

wss.on("connection", (ws) => {
  newConnection(clients, ws);

  ws.on("message", async (message) => {
    const data = await JSON.parse(message);

    if (data.type === "create room") {
      createRoom(clients, room, ws);
    } else if (data.type === "join-room") {
      joinRoom(clients, room, ws, data);
    } else if (data.type === "leave-room") {
      leaveRoom(ws, clients, room);
    }
    room.length > 0 && sendMessage(ws, data, clients, room);
  });

  ws.on("close", () => {
    room = [];
  });
});
