import { getServerSession } from "next-auth";
import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export default async function userData(){
    const session = await getServerSession();
    let email;
    if(session){
        email = session.user?.email
    }

    if(email){
        try{
            const userInfo = await prisma.user.findUnique({
                where: {
                    email: email
                },
                select: {
                    firstName : true,
                    lastName : true,
                    email : true
                }
            })
            if(userInfo){
                return NextResponse.json({
                    userInfo
                })
            }
        }catch(e){
            return NextResponse.json({
                message: "error in fetching user"
            })
        }
    }
}