import {prisma} from "../../../lib/prisma";
import  bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){

    const body = await req.json();
    const {firstName, lastName, email, password} = body;

    //user already exists or not
    try{
        const user = await prisma.user.findUnique({
            where : {
                email : email
            }
        })
        if(user){
            return NextResponse.json({
                message : "user already exits with this email"
            })
        }
    }catch(e){
       return NextResponse.json({
            message : "error in user signup"
       }) 
    }
    //if not create db entry

    //creating account first
    let accountInfo;
    try{
        const randomBalance = Math.floor(Math.random() * 1000);
        accountInfo = await prisma.account.create({
            data: {
                balance: randomBalance
            }
        })
    }catch(e){
        return NextResponse.json({
            message: "error in creating account"
        })
    }
    let hashedPassword;
    try{
        hashedPassword = await bcrypt.hash(password,5);

        const userInfo = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            password : hashedPassword,
            accountId: accountInfo.id
        }});
    
        return NextResponse.json({
                message: "signup success"
            })
    }catch(e){
        return NextResponse.json({
            message: "error in user creation",
            error: e

        })
    }
    
}