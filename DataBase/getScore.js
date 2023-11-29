import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


// fonction pour récupérer tout les scores

export default async function getScore(){

    try{

        const allUsers = await prisma.user.findMany();
        return allUsers;

    } catch (error) {


        console.error('Erreur lors de la récupération des scores :', error);
        throw error;  

    } finally {
        await prisma.$disconnect(); 
    }

}