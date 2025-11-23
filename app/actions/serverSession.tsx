"use server"

import { getServerSession } from "next-auth"

export default async function ServerSession(){
    const session = await getServerSession();
    if(session){
        return session
    }
}