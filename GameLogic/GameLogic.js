import ennemy from "../Enemy.js";

export let User = {};
export let Enemy = {};

export let conter = 0;
export let Property = {
  velocityY : 0,
  gravity : 1,
  ground : 450,
}

let Cube = [];




export function Update(io) {
    const currentTime = performance.now();

    Object.keys(User).forEach((userId) => {

        const user = User[userId];

        if (user.play)
          {
            if (user.SendEnemy === true)
              {
                // user.counter = 1;  
                // ennemy(Enemy[userId], 450)
                io.to(userId).emit('Enemy', "Go");
              }
              user.SendEnemy = false;
            
  
            

            let elapsedTime = currentTime - user.startGame;
            elapsedTime = Math.floor(elapsedTime / 15)
            io.to(userId).emit('Score', elapsedTime);
            if ((currentTime - user.lastTime) >= 4000){
                io.to(userId).emit('Speed');
                user.lastTime = currentTime;
                console.log("speed");
            }
            if (currentTime - user.lastTimeEnemy >= 20000){
              if (user.timeEnemy > 3)
                  user.timeEnemy -= 1;

              user.lastTimeEnemy = currentTime;
            }
            console.log(user.timeEnemy);
                
   
            
          }
    });

    

    if (Cube.length > 50)
    {
      Cube.shift();
    }
        
}

