"use client"

import axios from "axios";
import { useEffect, useState } from "react";

interface userInfoType{
    firstName: string,
    lastName: string,
    email: string
}

export default function UserInfo(){

    const [userInfo,setUserInfo] = useState<userInfoType | null>(null);

    async function getUserData(){
        const response= await axios("/api/v1/userdata");
        const data = await response.data;
        const userInfo = data.userInfo;

        if(data.userInfo){
            setUserInfo(userInfo);
        }
    }
    useEffect(()=> {
        getUserData()
    },[])

    if(userInfo )
    return(
        <div className="flex gap-2 items-center">
            <span className="text-base">Hello,{userInfo.firstName.charAt(0).toUpperCase() + userInfo.firstName.slice(1)}</span>
            {userInfo.firstName && <span className="bg-gray-300 rounded-full border px-2 py-1 text-xs uppercase">{String(userInfo.firstName).charAt(0).toUpperCase() + String(name).slice(1)}</span>}
        </div>
    )
    
}