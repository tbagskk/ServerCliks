import * as gameLogic from './GameLogic.js';

export default function initUser(userId, name){

    gameLogic.User[userId] = {
        name:name,
        x: 200,
        y: 400,
        width: 50,
        height: 50,
        velocityY: 200,
        gravity: 0.7,
        ground: 400,
        counter: 0,
        score: 0,
        play: false,
        startGame: 0,
        nbJump:0,
        lastTime:0,
        timeEnemy:6,
        lastTimeEnemy:0,
        SendEnemy:true,
      };
}