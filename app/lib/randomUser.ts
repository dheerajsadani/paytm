import {prisma} from "@/app/lib/prisma"

export default async function randomUserData(){

        const userCount = await prisma.user.count();
        let randomId;
        randomId = Math.floor((Math.random() * (userCount+9 - 15) + (15)));
        const result =  await prisma.user.findMany({
            take: 5,
            cursor: {
                id: randomId
            },
            select: {
                firstName: true,
                lastName: true,
                accountId: true
            }
        });
        return result

}