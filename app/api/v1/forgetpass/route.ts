import { prisma } from "@/app/lib/prisma";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest ){

    const body = await req.json();
    let {newPass,email} = body;

    if(newPass && email){
        newPass= String(newPass);
    }
    if(newPass.length >=8){
        let hashedPassword=null;

        try{
            hashedPassword = await bcrypt.hash(newPass,5);

            if(hashedPassword!=null){
                const user = await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        password : hashedPassword
                    },
                    select: {
                        firstName: true,
                        lastName: true
                    }
                });
                if(user.firstName){
                    return NextResponse.json({
                        message: "pass change success"
                    });
                }else{
                    return NextResponse.json({
                        message: "pass change failure"
                    });
                }
            }
        }catch(e){
            return NextResponse.json({
                message: "invalid request"
            })
        }
    }
}