"use client"

import { redirect } from "next/navigation"
import Button from "./Button"
import { signOut } from "next-auth/react"

export default function DashHeader(){
    return(
        <>
        <div className="flex pb-2 pl-3">
            <div className="flex justify-start">
                <button className="cursor-pointer border px-2 py-1 rounded-lg text-sm bg-[#AEDEFC]" onClick={()=> {redirect("/updateprofile")}}>
                    Update Profile
                </button>
            </div>

            <div className="absolute right-3">
                <Button tailwindClasses="cursor-pointer border px-3 py-1 rounded-lg text-sm bg-[#c40128] text-white font-semibold" onClick={()=> {signOut()}}>LogOut</Button>
            </div>
        </div>
        </>
    )
}