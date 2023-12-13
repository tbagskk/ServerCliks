import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function addInfos(infos){

    const Infos = {
        name: infos.name,
        msg: infos.msg
        
    }

    try {

        const user = await prisma.user.findFirst({
            where: {
                name: Infos.name,
            }
        })

        if (!user){
            console.error('User non trouvé');
            return;
        }

        const newMessage = await prisma.infos.create({
            data:{
                msg: Infos.msg,
                name: Infos.name,
                userId: user.id,
            },
        });

        console.log("message bien ajouté avec succès de", Infos.name)

    } catch (error) {
        console.error ("Erreur lors de l\'ajout du msg");
    } finally {
        await prisma.$disconnect();
    }


}