import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function addUser(name) {
  const User = {
    name: name,
    score: 0,
    skin: "default_skin",
    nbgame: 0,
  };

  try {
    const existingUser = await prisma.user.findFirst({
      // vérifier si l'user existe déjà
      where: {
        name: User.name,
      },
    });

    if (existingUser) {
      return "User already exits";
    } else {
      const newUser = await prisma.user.create({
        // sinon l'ajouter à la bdd
        data: {
          name: User.name,
          score: User.score,
          nbgame: User.nbgame,
          skin: User.skin,
        },
      });
      return "User created", newUser;
    }
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect(); // Fermez la connexion à la base de données
  }
}
