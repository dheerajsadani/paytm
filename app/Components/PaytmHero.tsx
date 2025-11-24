"use client"
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react"

import { ReceiverContext, SendMoneyContext } from "./Context/ContextProvider";
import UserLookUp from "./UserLookUp";

export default function PaytmHero({balance}: {balance: number}){

    const[showSucessModal,setShowSuccessModal] = useState(false);
    const {sendMoney , setSendMoney} = useContext(SendMoneyContext);
    const {receiver , setReceiver} = useContext(ReceiverContext);

    const amountRef = useRef<HTMLInputElement>(null);

    
    if(!sendMoney.value)
    return (
        <div>
            <UserLookUp />
        </div>
    )

    return(

        <div className="flex w-screen h-screen justify-center pt-[4%] bg-[#F3F2EC] ">
            <div className="md:w-[32%] w-[80%] md:h-[60%] h-[37%] border rounded-lg flex flex-col bg-white gap-8 relative border-gray-300 shadow-lg">

            {!showSucessModal && <button onClick={()=> {setSendMoney({value : false})}} 
                    className={`bg-[#6988e6] text-white font-semibold text-sm px-3 py-1.5 rounded-xl cursor-pointer ml-[3%] mt-[4%] absolute`}>Back</button>
            }
                    

            <div className="md:text-3xl text-2xl font-extrabold ml-[32%] mt-[4%]">Send Money</div>

            {/* {balance &&
                <div className="bg-[#F3F3E0] w-[45%] flex justify-center items-center rounded-lg py-1 ml-[25%] gap-2">
                    <div className="font-semibold">Balance: </div>
                    <div className="text-[#27548A] font-semibold border px-2 rounded-lg bg-green-200">$ {balance}</div>
                </div>
            } */}

            {receiver && 
                <div className="flex flex-col pl-[10%] pt-5">
                    <div className="w-[75%]">
                        <div className="flex gap-3 items-center">
                            <span className="bg-green-500 rounded-full border px-2 py-1 md:text-3xl text-xl text-white font-medium uppercase md:w-11 md:h-11 w-8 h-8 flex items-center justify-center">{receiver.firstName.charAt(0).toUpperCase()}</span>
                            <div className="text-2xl font-bold">{receiver.firstName.charAt(0).toUpperCase()}{receiver.firstName.slice(1)} {receiver.lastName.charAt(0).toUpperCase()}{receiver.lastName.slice(1)}</div>
                        </div>
                        <div className="text-sm font-semibold mt-5">Amount (in Rs)</div>
                    </div>
                    <div className="w-[91%] flex flex-col mt-2">
                        <input type="number" ref={amountRef} placeholder="Enter amount" className="border border-gray-200 rounded-lg py-1 text-base px-4 text-center placeholder:text-left"></input>
                        <button className="text-white bg-green-500 px-2 py-2.5 cursor-pointer text-base font-semibold rounded-md mt-8"
                            onClick={async()=> {
                                if(amountRef.current!=null && amountRef.current!=undefined && amountRef.current.value.length>0){
                                    const tempAmount = parseInt(amountRef.current.value);
                                    
                                    await setReceiver((v: any)=> {
                                        const temp = v;
                                        temp.amount = tempAmount;
                                        return temp
                                    });
                                    if(receiver.amount){
                                        const result = await axios.put("/api/v1/initiatetransfer",{
                                            receiverId : receiver.accountId,
                                            amount : receiver.amount
                                        });
                                        const data = await result.data;
                                        if(data.message == "transfer success"){
                                            setShowSuccessModal(true);
                                        }
                                    }  
                                }
                            }}
                        >Initiate Transfer </button>
                    </div>

                </div>
            }

            {showSucessModal &&   
                    <div className="glass ml-[2.5%] md:w-[82%] md:h-[81%] h-[92%] w-[90%] top-[5%] md:left-[7.5%] left-3 border rounded-lg absolute flex items-center flex-col gap-3">
                        <div className="pt-[20%]">
                            <img src="/tick.gif" width={70} height={70}></img>
                        </div>

                        <div className="text-xl font-bold">
                            Transfer Successful
                        </div>

                        <div className="pt-4">
                            <button onClick={()=> 
                                {
                                    setShowSuccessModal(false);
                                    setSendMoney({value: false});
                                }
                            } className={`bg-black text-white font-semibold text-xl px-5 py-1 rounded-2xl cursor-pointer `}>Back</button>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
    
}