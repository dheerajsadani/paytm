import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export default async function userAccount(){
    const session = await getServerSession();
    let email;
    let userAccountId;
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
                return NextResponse.json({
                            accountId : user.account.id,
                            balance: user.account.balance
                        })
            }else{
                return NextResponse.json({message: "invalid account"})
            }
            // if(user){
            //     userAccountId = user.accountId;
            // }
            // if(userAccountId){
            //     try{
            //         const userAccount = await prisma.account.findUnique({
            //             where: {
            //                 id: userAccountId
            //             },
            //             select: {
            //                 balance: true
            //             }
            //         })

            //         if(userAccount){
            //             return NextResponse.json({
            //                 balance: userAccount.balance
            //             })
            //         }else{
            //             return NextResponse.json({
            //                 message: "invalid account"
            //             })
            //         }
                    
            //     }catch(e){
            //         return NextResponse.json({
            //             message: "error in fetching user Balance"
            //         })
            //     }
            // }
        }catch(e){
            return NextResponse.json({
                message: "error in fetching user"
            })
        }
    }
}