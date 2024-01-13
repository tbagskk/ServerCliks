import express from "express";
import { createServer } from "http";
import { Server } from "@colyseus/core";
import { WebSocketTransport } from "@colyseus/ws-transport";
import GameRoom from "./GameRoom.js";

const app = express();
const server = createServer(app); // create the http server manually

const gameServer = new Server({
  transport: new WebSocketTransport({
    server, // provide the custom server for `WebSocketTransport`
  }),
});

gameServer.define("game", GameRoom);

const PORT = 3001; // spécifiez le port que vous souhaitez utiliser

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
