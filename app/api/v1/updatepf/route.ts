import { prisma } from "@/app/lib/prisma";
import { getServerSession } from "next-auth";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest ){
    const body = await req.json();
    const {firstName,lastName,password} = body;
    interface updatingDataType{
        firstName? : string,
        lastName? : string,
        password? : string
    }
    let updatingData:updatingDataType= {};

    if(firstName!=null && firstName!=undefined){
        updatingData.firstName=firstName
    }

    if(lastName!=null && lastName!=undefined){
        updatingData.lastName=lastName
    }
    
    if(password!=null && password!=undefined){

        async function hashPass(password : string){
            const hashedPass = await bcrypt.hash(password,5);
            return hashedPass;
        }

        const hashedPassword= await hashPass(password);
        updatingData.password=hashedPassword;
    }

    const session = await getServerSession();
    if(session && session.user?.email){
        //updating user
        const userEmail= session.user?.email;
        
        try{
            const userInfo = await prisma.user.update({
                where:{
                    email : session.user.email
                },
                data: updatingData
            })

            return NextResponse.json({
                message: "updated"
            })
        }catch(e){
            return NextResponse.json({
                message: "error in update"
            })
        }
    }
    
}