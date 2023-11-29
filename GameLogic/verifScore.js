import * as gameLogic from './GameLogic.js';
import addscore from '../DataBase/addScore.js';

export function verifScore(userId, io){

    // fonction pour vérifier si le score envoyé est legit en fonction du nombre de jump
    
    gameLogic.User[userId].play = false;
    const currentTime = performance.now();
    gameLogic.User[userId].score = Math.floor((currentTime - gameLogic.User[userId].startGame)/15);
    io.to(userId).emit("ScoreLost", gameLogic.User[userId].score);
    console.log("score de verif", gameLogic.User[userId].score);
    addscore(gameLogic.User[userId].name, gameLogic.User[userId].score, gameLogic.User[userId].skin);

}

export function addJump(userId){

    // fonction a implementer pour vérifier si les jumps sont legit
    // verifier si le temps entre les jump est legit

    gameLogic.User[userId].nbJump += 1;

}