import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function addScore(name, score, skin) {

  try{

  

    const User = {
        name: name,
        score: score,
        skin: skin,
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        name: User.name,
      },
    });

    console.log(existingUser);
    let formerScore = existingUser.score;
    let nbgame = existingUser.nbgame;
    let newscore = formerScore;

    if (User.score > formerScore) 
          newscore = User.score;

      const updatedUser = await prisma.user.updateMany({
        where: {
          name: User.name, 
        },
        data: {
          score: newscore,
          skin: User.skin,
          nbgame: (nbgame + 1)
        },
      });

  } catch (error){

  } finally {
        await prisma.$disconnect(); // Fermez la connexion à la base de données
    }


   

};