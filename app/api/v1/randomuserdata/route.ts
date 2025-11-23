import { prisma } from "@/app/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(){
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
        if(result){
            return NextResponse.json({
                result
            })
        }else{
            return NextResponse.json({
                message: "failed to fetch random users"
            })
        }
}