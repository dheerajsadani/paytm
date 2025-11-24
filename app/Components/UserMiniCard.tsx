"use client"
import {TASA_Orbiter} from "next/font/google";
import SendMoneyButton from "./Buttons/SendMoneyButton";
import { useContext } from "react";
import { ReceiverContext, SendMoneyContext } from "./Context/ContextProvider";

interface UsersDataType{
    firstName: string,
    lastName: string,
    accountId: number
}

interface UserMiniCardType{
    randomUser: UsersDataType
}

const TASAOrbiter = TASA_Orbiter({
  weight:'400'
});

export default function UserMiniCard({randomUser}: UserMiniCardType){

     const {sendMoney , setSendMoney} = useContext(SendMoneyContext);
    const {receiver , setReceiver} = useContext(ReceiverContext);
    return(
        <div>
            <div className="flex">
                <div className="flex gap-4 items-center">
                    <div className={`text-lg flex items-center justify-center font-medium ${TASAOrbiter.className} bg-gray-300 rounded-full h-9 w-9`}>{randomUser.firstName.charAt(0).toUpperCase()}</div>
                    <span className="font-semibold text-xl leading-none">{randomUser.firstName.charAt(0).toUpperCase() + randomUser.firstName.slice(1)} {randomUser.lastName.charAt(0).toUpperCase() + randomUser.lastName.slice(1)}</span>
                </div>
                <SendMoneyButton tailwindClasses="absolute md:left-100 left-70" 
                    onClick={()=> {
                        setSendMoney({value : true});
                        setReceiver((v:any)=> {
                            return {
                            firstName: `${randomUser.firstName}`,
                            lastName: `${randomUser.lastName}`,
                            accountId: randomUser.accountId
                        }
                        })
                    }
                } />
            </div>
            
        </div>
    )
}

