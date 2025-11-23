"use client"

import { createContext, useState } from "react"



export const SendMoneyContext = createContext(null);
export const ReceiverContext = createContext(null);
// export const UserBalanceContext = createContext(null);

export function SendMoneyProvider({children}: {children: React.ReactNode}){
    const [sendMoney,setSendMoney] = useState(false);

    return <SendMoneyContext value={{value : [sendMoney,setSendMoney]}}>{children}</SendMoneyContext>
}

export function ReceiverProvider({children}: {children: React.ReactNode}){
    const [receiver,setReceiver] = useState(null);
    return <ReceiverContext value={{value : [receiver,setReceiver]}}>{children}</ReceiverContext>
}

// export function UserBalanceProvider({children}: {children: React.ReactNode}){
//     const [balance,setBalance] = useState(null);
//     return <UserBalanceContext value={{value : [balance,setBalance]}}>{children}</UserBalanceContext>
// }



