"use client"

import { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Button from "@/app/Components/Buttons/Button";

import {Doto} from "next/font/google";

const DotoFont= Doto({
    weight:"600"
})

export default function Signup(){
    const fnRef = useRef<HTMLInputElement>(null);
    const lnRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    return(
        <div className="flex pt-[8%] items-center h-screen w-screen bg-[#F3F2EC] flex-col">

            <div className="w-[32%] h-[75%] border rounded-lg flex flex-col bg-white pl-[4%] gap-8 relative shadow-2xl border-gray-300">
                <div className={`pt-[10%] pl-[28%] text-xl ${DotoFont.className}`}>WASSUP :)</div>

                <div className="gap-7 flex flex-col">
                    <div className="flex gap-3">
                        <span className="text-lg font-semibold">Firstname :</span>
                        <input ref={fnRef} type="text" placeholder="John"  maxLength={15} className="border max-length rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold"></input>
                    </div>

                    <div className="flex gap-3">
                        <span className="text-lg font-semibold">Lastname :</span>
                        <input ref={lnRef} type="text" placeholder="Smith" maxLength={15} className="border max-length rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold"></input>
                    </div>

                    <div className="flex gap-7">
                        <span className="text-lg font-semibold">Email :</span>
                        <input ref={emailRef} type="text" placeholder="example@gmail.com" maxLength={25} className="border max-length  rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold w-60"></input>
                    </div>

                    <div className="flex gap-3">
                        <span className="text-lg font-semibold">Password :</span>
                        <input ref={passRef} type="password" placeholder="**********" maxLength={15} className="border max-length rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold"></input>
                    </div>
                </div>

                <div className="mt-[8%] pl-[10%]">
                    <span className="text-base font-semibold text-[#143f9c] ">Already have an account? </span>
                    <Button onClick={()=> router.push("/auth/signin")} tailwindClasses="bg-[#313647] text-white border-1 rounded-xl px-4 py-0.5 mt-5 cursor-pointer text-base font-semibold min-w-8 max-w-fit hover:bg-black">Login</Button>
                </div>

            
                <div className="pl-[26%] absolute bottom-20">
                    <Button onClick={async()=> {
                            if(fnRef.current && lnRef.current && emailRef.current && passRef.current){
                                const res = await axios.post("/api/v1/signup",{
                                    firstName: fnRef.current.value,
                                    lastName: lnRef.current.value,
                                    email: emailRef.current.value,
                                    password: passRef.current.value
                                });
                            const data = await res.data;

                            if(data.message== "user already exits with this email"){
                                alert("account with email already exists")
                            }

                            if(data.message== "signup success"){
                                router.push("/auth/signin")
                            }
                            
                            else{
                                alert("signup failed");
                            }
                        }
                    }}>Signup</Button>
                </div>
                
            </div>

            
        </div>

    )
}