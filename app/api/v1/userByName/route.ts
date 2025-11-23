import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    const session = await getServerSession();
    if(!session){
        return NextResponse.json({
            message: "invalid requests"
        });
    }
    const body = await req.json();
    let {nameKeyword} = body;
    nameKeyword = String(nameKeyword).charAt(0).toUpperCase() + String(nameKeyword).slice(1);

    const users = await prisma.user.findMany({
        where: {
            firstName : nameKeyword
        },
        select: {
            firstName: true,
            lastName: true,
            accountId: true
        }
    })
    if(users.length>0){
        return NextResponse.json({
            users,
            message: "success"
        })
    }else{
        return NextResponse.json({
            message: "null"
        })
    }
}