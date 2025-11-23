"use client"

import { useEffect, useRef } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";


export default function UpdateProfile(){
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function updateProfileData(){
        interface updatingDataType{
        firstName? : string,
        lastName? : string,
        password? : string
    }
    let updatingData:updatingDataType= {};
        if(firstNameRef.current?.value ){
            updatingData.firstName = firstNameRef.current?.value ;
        }
        if(lastNameRef.current?.value ){
            updatingData.lastName = lastNameRef.current?.value ;
        }
        if(passwordRef.current?.value ){
            updatingData.password = passwordRef.current?.value ;
        }
        
        try{
            let data = updatingData;
            const response = await axios.put("/api/v1/updatepf",
                data
            );

            const res = await response.data;
            if(res.message = "updated"){

                try{
                    await getProfileData();
                    alert("Profile updated!");

                }catch(e){
                    alert("Try Again :)");
                    return
                }
            }
        }catch(e){
            alert("Try Again!!");
        }
    }

    async function getProfileData(){
        const session = await getSession();
        if(session){
                const response= await axios("/api/v1/userdata");
                const data = await response.data;
                if(data){
                    firstNameRef.current!.value = data.userInfo!.firstName;
                    lastNameRef.current!.value = data.userInfo!.lastName;
                    passwordRef.current!.value = "************";
                }else{
                    alert("Refresh");
                }
        }
        
    }
    useEffect(()=> {
        getProfileData();
    },[])
    return(
        <div className="h-screen w-screen bg-[#FFF2EF] pt-3 pr-3">
            <div className="flex justify-end">
                <button className="cursor-pointer border px-3 py-1 rounded-lg text-sm bg-[#AEDEFC]" onClick={()=> {redirect("/")}}>
                    Home
                </button>
            </div>
            <div className="flex pt-[13%] items-center flex-col">
                    <div className="flex">
                        <div className="gap-7 flex flex-col">
                            <div className="flex gap-3">
                                <span className="text-lg font-semibold">FirstName</span>
                                <input maxLength={15} className="border max-length rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold" ref={firstNameRef}></input>
                            </div>

                            <div className="flex gap-3">
                                <span className="text-lg font-semibold">LastName</span>
                                <input maxLength={15} ref={lastNameRef} className="border rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold"></input>
                            </div>

                            <div className="flex gap-2 items-center">
                                <div className="flex gap-3">
                                    <span className="text-lg font-semibold">Password</span>
                                    <input maxLength={18} ref={passwordRef} className="border rounded-md outline-none text-base text-center text-[#1A2A4F] font-bold"></input>
                                </div>
                                <div >
                                    <button className="cursor-pointer" onClick={()=> 
                                        {
                                            passwordRef.current!.value="";
                                            passwordRef.current!.focus();
                                        }}>
                                        <img width="28" height="28" src="/pencil.png" className=" "></img>
                                    </button>
                                </div>
                            </div>
                        </div>    
                    </div>               
                    <div>
                        <button onClick={updateProfileData} className="bg-green-300 border-2 rounded-md px-5 py-1 mt-8 cursor-pointer hover:bg-green-500 text-lg font-semibold">
                            Update
                        </button>
                    </div>
            </div>
        </div>
    )
}