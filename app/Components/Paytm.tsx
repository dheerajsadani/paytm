"use client"
import PaytmHero from "./PaytmHero"
import UserInfo from "./UserInfo"

import { ReceiverContextProvider, SendMoneyContextProvider } from "./Context/ContextProvider"

interface PaytmType{
    balance:number
}

export default function Paytm({balance}:PaytmType){
    return(
        <div className=" bg-white min-h-[500px] max-h-full w-full text-xl pt-1">
            <div className="pb-3 border-b border-gray-300 flex items-center">
                <span className="font-semibold pl-5 pt-1 StackSansHeadline">Payments App</span>
                <div className="absolute right-5">
                    <UserInfo/>
                </div>
            </div>
            <div className="text-base pb-3 pt-3 flex pl-5 gap-3 items-center">
                <span className="font-bold">Your Balance</span>
                <span className={`font-semibold border px-2 rounded-lg ${balance>0 ? "bg-green-200" : "bg-red-200"}`}>${balance}</span>
            </div>


            <SendMoneyContextProvider>
                <ReceiverContextProvider>
                    <PaytmHero balance={balance} />
                </ReceiverContextProvider>
            </SendMoneyContextProvider>
            
        </div>
    )
}