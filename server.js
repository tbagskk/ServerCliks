import express from 'express';
import http from 'http';
import { Server, Socket } from "socket.io";
import cors from 'cors';
import ennemy from "./Enemy.js";


import { clearInterval } from 'timers';


const app = express();

const port = 3001;

const server = http.createServer(app); // pour créer le serveur socket






// a mettre dans un autre fichier

let User = {};
let Enemy = {};

let conter = 0;
let Property = {
  velocityY : 0,
  gravity : 1,
  ground : 450,
}

let Cube = [];

let Idinterval;


// a mettre dans un atre fichier








app.get('/', (req, res) => {
  res.send('Bienvenue sur la page d\'accueil !');
});

app.use(cors({
    // origin: 'http://172.20.10.2:3000', 
    origin: 'http://172.30.135.239:3000', // pour autoriser les appel get et post depuis un autre url
}));




server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); 
});

const io = new Server(server, { // pour créer une connexion socket
    path: '/socket.io', 
    cors: {
        // origin: "http://172.20.10.2:3000",
        origin: 'http://172.30.135.239:3000',
        methods: ["GET", "POST"]
      }
});

io.on('connection', (socket) => { // tout ce passe dans cette boucle

    console.log('Nouvelle connexion:', socket.id);
    io.emit('userConnected', `Utilisateur ${socket.id} connecté`);
    

    User[socket.id] = {
      x: 200,
      y: 400,
      width: 50,
      height: 50,
      velocityY: 200,
      gravity: 1,
      ground: 400,
      nbrReq:0,
      counter:0,
      lost:false
  };

  Enemy[socket.id] = [];
  
 
    socket.on("JumpFront", (arg) => {  // écoute si on saute et renvoie un saut
      const user = User[socket.id];
      // User[socket.id].y = 200;
      // User[socket.id].velocityY = -15;
      // console.log("user de jump", user);
      user.nbrReq = 0;
    });

    function Update() {
      Object.keys(User).forEach((userId) => {
          const user = User[userId];
  
        if (user.counter === 6){
          ennemy(Enemy[userId], 450)
          io.to(userId).emit('Enemy', Enemy[userId][Enemy[userId].length - 1]);
          user.counter = 0;
        }
          user.counter++;
        //  user.y = Math.min(user.y + user.velocityY, user.ground);// ok //ok

           
        
        
      
        // if (user.nbrReq < 50 )
        // {
        //   user.velocityY += user.gravity;
        //   io.to(userId).emit('UserY', user.y);
          
        //   user.nbrReq++;
        // }
          
      //  console.log(user.nbrReq);

        // Enemy[userId].forEach((cub) => {
        //      cub.x -= 10 * 1;
        //     // if (collision(user, cub)) {
        //     //     io.to(userId).emit('Lost', "Lost");
        //     //     console.log("perdu")
        //     // }
        // });
         
   
      });
  
      
  
      if (Cube.length > 10)
      {
        Cube.shift();
      }
          
  }
  
  if (!Idinterval)
    Idinterval = setInterval(Update, 1000 / 6);



  
    socket.on('disconnect', () => {
      console.log('Déconnexion:', socket.id);
      // clearInterval(interval1);
      io.emit('userDisconnected', `Utilisateur ${socket.id} déconnecté`);
      delete User[socket.id];
    });
  });

  
  function collision(player, enemy) {

    return (
        player.x < enemy.x + enemy.width &&
        player.x + player.width > enemy.x &&
        player.y < enemy.y + enemy.height &&
        player.y + player.height > enemy.y
    );
  }



 

//   setInterval(() => {
//     ennemy(Cube, 450)
// }, 1000);