"use client"
import {TASA_Orbiter} from "next/font/google";
import SendMoneyButton from "./SendMoneyButton";
import { useContext } from "react";
import { ReceiverContext, SendMoneyContext } from "./ContextProvider";

// import { useRouter } from "next/navigation";

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
    // const router = useRouter();

    const SendMoneyContexts = useContext(SendMoneyContext);
    const sendMoney = SendMoneyContexts.value[0];
    const setSendMoney = SendMoneyContexts.value[1];

    const ReceiverContexts = useContext(ReceiverContext);
    const receiver = ReceiverContexts.value[0];
    const setReceiver = ReceiverContexts.value[1];
    return(
        <div>
            <div className="flex">
                <div className="flex gap-4 items-center">
                    <div className={`text-lg flex items-center justify-center font-medium ${TASAOrbiter.className} bg-gray-300 rounded-full h-9 w-9`}>{randomUser.firstName.charAt(0).toUpperCase()}</div>
                    <span className="font-semibold text-xl leading-none">{randomUser.firstName.charAt(0).toUpperCase() + randomUser.firstName.slice(1)} {randomUser.lastName.charAt(0).toUpperCase() + randomUser.lastName.slice(1)}</span>
                </div>
                <SendMoneyButton tailwindClasses="absolute left-100" 
                    onClick={()=> {
                        setSendMoney(true);
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

