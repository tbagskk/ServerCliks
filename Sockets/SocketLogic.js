
import { Server } from "socket.io";
import * as gameLogic from '../GameLogic/GameLogic.js';
import initUser from "../GameLogic/UserInit.js";
import { verifScore, addJump } from "../GameLogic/verifScore.js";
import addUser from "../DataBase/addUser.js";

// code secret :  3sdC -> jump  diEh -> play 528= -> Lost

let Idinterval;
let nbrConnexion = 0;

function initSockets(io) {

  io.on('connection', (socket) => {

    nbrConnexion += 1;
    console.log('Nouvelle connexion:', socket.id);

    socket.on("name", (arg) => {  // jump
       initUser(socket.id, arg);
       addUser(arg);
    });

    socket.on("skin", (arg) => {  // jump  // penser a rajouter une sécurité parsing sur skin
      gameLogic.User[socket.id].skin = arg;
   });

    // initUser(socket.id);
    io.emit('nbrPlayer', Object.keys(gameLogic.User).length);
    gameLogic.Enemy[socket.id] = [];

    socket.on("3sdC", (arg) => {  // jump
      addJump(socket.id);
    });

    

    socket.on("diEh", (arg) => {  // play
      initUser(socket.id, gameLogic.User[socket.id].name);
        if (gameLogic.User[socket.id].play === false){
            gameLogic.User[socket.id].play = true;
            gameLogic.User[socket.id].startGame = performance.now();}
      });

    socket.on("528=", (arg) => {  // lost
      if (gameLogic.User[socket.id].play === true)
          verifScore(socket.id, io);

        io.to(socket.id).emit("lostServer", 'lost');
    });

    if (!Idinterval && nbrConnexion > 0)  // lancement de la boucle de jeu
      Idinterval = setInterval(() => gameLogic.Update(io), 1000 / 6);

    socket.on('disconnect', () => {
      console.log('Déconnexion:', socket.id);
      io.emit('userDisconnected', `Utilisateur ${socket.id} déconnecté`);
      delete gameLogic.User[socket.id];
      nbrConnexion -= 1;
    });
  });
}

export default initSockets;
