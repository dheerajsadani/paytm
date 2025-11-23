import { prisma } from "@/app/lib/prisma";
import userAccount from "@/app/lib/userAccount";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(req: NextRequest){
    const session = await getServerSession();
    if(!session){
        return NextResponse.json({
            message: "invalid user request"
        })
    }
    const body = await req.json();
    const {receiverId , amount} = body;
    console.log(receiverId)
    console.log(amount)
    if(!receiverId || !amount){
        return NextResponse.json({
            message: "transfer request with insufficient data"
        })
    }

    if(amount<=0){
        return NextResponse.json({
            message: "enter valid amount"
        })
    }
    
    let email;
    let userAccountInfo;

    email = session.user?.email;

    if(email){
        try{
            const userAccountInfo = await userAccount();
            if(userAccountInfo){
                const  {accountId, balance} = userAccountInfo;
                if(accountId && balance){

                    if(balance < amount){
                        return NextResponse.json({
                            message: "insufficient funds"
                        })
                    }else{
                        //continue with transfer
                        try{
                            const [sender,receiver]  = await prisma.$transaction([
                                prisma.account.update({
                                    where : {
                                        id: accountId
                                    },
                                    data: {
                                        balance : {
                                            decrement : amount
                                        }
                                    }
                                }),
                                prisma.account.update({
                                    where : {
                                        id: receiverId
                                    },
                                    data: {
                                        balance : {
                                            increment : amount
                                        }
                                    }
                                })
                            ])
                            if(sender && receiver){
                                return NextResponse.json({
                                    message: "transfer success"
                                })
                            }else{
                                return NextResponse.json({
                                    message: "transfer failed"
                                })
                            }
                        }catch(e){
                            return NextResponse.json({
                                message: "transfer failed"
                            })
                        }
                    }
                }else{
                    return NextResponse.json({
                        message: "error in getting user Account info"
                    })
                }
            }else{
                return NextResponse.json({
                        message: "error in fetching user acccount info"
                    })
            }
        }catch(e){
            return NextResponse.json({
                        message: "error in transfer"
                    })
        }
    }else{
        return NextResponse.json({
            message: "invalid user"
        })
    }

}