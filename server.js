import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { EventEmitter } from "events";

import addInfos from "./DataBase/addInfos.js";
import getScore from "./DataBase/getScore.js";
import addUser from "./DataBase/addUser.js";
import initSockets from "./Sockets/SocketLogic.js";

EventEmitter.defaultMaxListeners = 15;
dotenv.config();
const app = express();
// const port = 3001;
const port = 8080;
const server = http.createServer(app); // pour créer le serveur socket

app.use(express.json()); // pour interpreter les requêtes en JSON

app.use(
  cors({
    origin: "https://cliks.vercel.app", // pour autoriser les appel get et post depuis un autre url
    // origin: 'http://localhost:3000',
  }),
);

app.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil !");
});

app.post("/infos", async (req, res) => {
  try {
    const msg = await addInfos(req.body);
    if (msg === false) {
      res.status(200).json({ message: "User non trouvé" });
    } else {
      res.status(201).json({ message: "Message bien envoyé" });
    }
  } catch (error) {
    res.status(500).json({ error: "erreur" });
  }
});

app.get("/scores", async (req, res) => {
  try {
    const allUsers = await getScore();
    res.json(allUsers);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des Users" });
  }
});

const io = new Server(server, {
  // pour créer une connexion socket
  path: "/socket.io",
  cors: {
    origin: "https://cliks.vercel.app",
    // origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  },
});

initSockets(io);

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
