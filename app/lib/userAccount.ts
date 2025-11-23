import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";


export default async function userAccount(){
    const session = await getServerSession();
    let email;

    if(session){
        email = session.user?.email
    }

    if(email){
        try{
            const user = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    account : true
                }
            })

            if(user){
                return {
                    accountId : user.account.id,
                    balance: user.account.balance
                }
            }else{
                return {
                    accountId : null,
                    balance: null
                }
            }
        }catch(e){
            console.log("error in getting balance")
        }
    }
}