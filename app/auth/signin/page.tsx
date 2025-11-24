"use client"

import Button from "@/app/Components/Buttons/Button";
import { signIn } from "next-auth/react";
import { useRef, useState } from "react"
import {Doto} from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";

const DotoFont= Doto({
    weight:"600"
})


export default function LogIn(){
    const emailRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const [forgetPass,setForgetPass] = useState(false);

    const newPassRef = useRef<HTMLInputElement>(null);
    const cnfNewPassRef = useRef<HTMLInputElement>(null);
    const [changePassSuccess,setChangePassSuccess]= useState(false);
    const userEmailRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    if(!forgetPass)
    return(
        <div className="flex md:pt-[8%] pt-[14%] items-center h-screen w-screen bg-[#F3F2EC] flex-col">

            <div className=" md:w-[32%] md:h-[70%] w-[85%] h-[52%] border rounded-lg flex flex-col bg-white pl-[4%] gap-8 relative">

                <div className={`pt-[10%] md:pl-[20%] pl-[25%] text-xl ${DotoFont.className}`}>Welcome Back :)</div>

                <div className="md:gap-8 gap-10 flex flex-col pt-1.5">
                    <div className="flex gap-5">
                        <span className="text-lg font-semibold">Email: </span>
                        <input ref={emailRef} type="text" placeholder="example@gmail.com" maxLength={25} className="border max-length  rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold w-60"></input>
                    </div>
                    <div>
                        <div className="flex gap-2">
                            <span className="text-lg font-semibold">Password :</span>
                            <input ref={passRef} type="password" placeholder="**********" maxLength={15} className="border max-length rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold px-3"></input>
                        </div>
                        <div className="relative pt-1.5">
                            <button onClick={()=> setForgetPass((v)=> {return !v})} className="absolute md:right-27 right-8 text-xs cursor-pointer text-[#17305a] font-semibold">Forget Password?</button>
                        </div>
                    </div>
                
                </div>

                <div className="md:pl-[35%] pl-[38%]">
                    <Button onClick={async()=> {
                    if(emailRef.current && passRef.current){
                        await signIn("credentials",{
                            email: emailRef.current.value,
                            password: passRef.current.value
                        })
                    }
                    }}>Login</Button>
                </div>

                <div className="md:-mt-[8%]  pl-[28%] -mt-[10%]">
                    <span className="text-base text-[#143f9c] font-semibold"> New User? </span>
                    <Button onClick={()=> router.push("/auth/signup")} tailwindClasses="bg-[#313647] text-white border-1 rounded-xl px-4 py-0.5 mt-5 cursor-pointer text-base font-semibold min-w-8 max-w-fit hover:bg-black">Create</Button>
                </div>
            </div>
        </div>
    )

    return(
        <div className="flex w-screen h-screen justify-center md:pt-[8%] pt-[14%]  bg-[#F3F2EC]">
            <div className="md:w-[32%] md:h-[68%] w-[94%] h-[54%] border rounded-lg flex flex-col bg-white md:pl-[4%] pl-[5%] md:pr-[0%] gap-8 relative">

                {!changePassSuccess &&<button onClick={()=> {setForgetPass(false)}} 
                    className={`bg-[#6988e6] text-white font-semibold text-sm px-3 py-1.5 rounded-xl cursor-pointer absolute left-3 top-3`}>Back
                </button>
                }

                <div className={`md:pt-[12%] pt-[18%] text-xl ${DotoFont.className}`}>Forgot Password? NO WORRIES :)</div>

                <div className="flex">
                    <div className="flex flex-col md:gap-6 pt-1.5 gap-7">
                        <div className="text-base font-semibold text-center">Email</div>
                        <div className="text-base font-semibold text-center">OTP</div>
                        <div className="text-base font-semibold mt-1">New Password</div>
                        <div className="text-base font-semibold">Confirm New <br/><span className="flex justify-center">Password</span></div>
                    </div>

                    <div className="flex flex-col md:gap-4 gap-5 md:pl-6 pl-3 mt-0.5">
                        <input ref={userEmailRef} placeholder="example@gmail.com" type="text" className="px-4 pt-1 w-[120%] border rounded-lg border-[#45454564] outline-none tracking-[2] focus-within:caret-amber-700"></input>
                        <input type="text" placeholder="123456" maxLength={6} className=" py-0.5 mt-0.5 w-[65%] border rounded-lg border-[#45454564] outline-none text-center tracking-[3] focus-within:caret-amber-700"></input>
                        <input ref={newPassRef} placeholder="* * * * * * * * * * * * * * * " className="px-4 pt-1 mt-1.5 md:w-full w-[90%] border rounded-lg border-[#45454564] outline-none tracking-[2] focus-within:caret-amber-700" type="text"></input>
                        <input ref={cnfNewPassRef}placeholder="* * * * * * * * * * * * * * * " type="password" className="px-4 pt-1 mt-3.5 md:w-full w-[90%] border rounded-lg border-[#45454564] outline-none tracking-[2] focus-within:caret-amber-700"></input>
                    </div>
                </div>
                <div className="relative pt-7">
                    <div className="flex absolute md:left-38 md:-bottom-1 left-40 -bottom-1">
                    <Button onClick={async()=> {
                        if(newPassRef.current && cnfNewPassRef.current && userEmailRef.current ){
                            if(userEmailRef.current.value.length ==0){
                                alert("enter you email");
                                return
                            }
                            if(newPassRef.current.value.length>=8 && cnfNewPassRef.current.value.length>=8){
                                if(newPassRef.current.value == cnfNewPassRef.current.value){
                                    const result = await axios.put("/api/v1/forgetpass",{
                                        email: `${userEmailRef.current.value}`,
                                        newPass: `${cnfNewPassRef.current.value}`
                                    });
                                    const data = await result.data;
                                    if(data.message == "pass change success"){
                                        setChangePassSuccess(true);
                                    }else{
                                        alert("Failed to change password TRY AGAIN!")
                                    }
                                }else{
                                    alert("new password & confirm new password aren't same");
                                }  
                            }else{
                                alert("password cannot be less than 8 letters");
                            }
                        }
                    }}>Reset</Button>
                    </div>
                </div>

                {changePassSuccess &&   
                    <div className="glass  md:w-[85%] md:h-[92%] w-[94%] h-[92%] top-[5%] md:left-[7.5%] left-3  border rounded-lg absolute flex items-center flex-col gap-3">
                        <div className="md:pt-[20%] pt-[33%]">
                            <img src="/tick.gif" width={70} height={70}></img>
                        </div>

                        <div className="text-xl font-bold">
                            Password Changed
                        </div>

                        <div className="pt-4">
                            <button onClick={()=> 
                                {
                                    setChangePassSuccess(false);
                                    setForgetPass(false);
                                }
                            } className={`bg-black text-white font-semibold text-xl px-5 py-1 rounded-2xl cursor-pointer ${DotoFont.className}`}>Back</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )




    
}