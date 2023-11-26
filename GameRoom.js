import { Room } from "@colyseus/core";
import ennemy from "./Enemy.js";



export default class GameRoom extends Room {

    lastFrameTime = Date.now();
    a = 0;
    User = {
        x : 200,
        y : 450,
        width : 50,
        height : 50
    }
    
    Property = {
        velocityY : 0,
        gravity : 1,
        ground : 450,
    }

    lastEnemyExecutionTime = Date.now();
    Cube = [];

    // When room is initialized
    onCreate (options) { 
        console.log("salle créee");
        

        this.setSimulationInterval(() => this.updateGame(), 1000 / 30);

        this.onMessage("keydown",(client, message) => {
            console.log(`Message reçu de ${client.sessionId}:`, message);
            this.Property.velocityY = -15;
            
            
        });
        
        setInterval(() => {
            const serverTime = Date.now();
            this.broadcast("StartTime", { content: serverTime });
            this.broadcast("A", { content: this.a });
           
        }, 1000);

    }

    // Authorize client based on provided options before WebSocket handshake is complete
    onAuth (client, options, request) {
        return true;
     }

    // When client successfully join the room
    onJoin (client, options, auth) { 
        console.log("Connexion réussi");
        this.broadcast("Go", { content: "GO" });
    }

    // When a client leaves the room
    onLeave (client, consented) {
        console.log("Client Déconnexion");
     }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }

    updateGame() {
        const currentTime = Date.now();
        const deltaTime = (currentTime - this.lastFrameTime) / 20;
        this.User.y = Math.min(this.User.y + this.Property.velocityY * deltaTime , 450);
        this.Property.velocityY += this.Property.gravity * deltaTime;
    //    ennemy(this.Cube, 450);
    //    console.log(this.Cube);
        // this.broadcast("Usery", { content: this.Property.velocityY });
            this.a++;
         this.lastFrameTime = currentTime;
        }
}
