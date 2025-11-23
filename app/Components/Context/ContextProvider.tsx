import React, {  useState } from 'react'

interface IValue{
    value : Boolean
}
interface SendMoneyContextType {
    sendMoney : IValue,
    setSendMoney : React.Dispatch<React.SetStateAction<IValue>>
}

export const SendMoneyContext = React.createContext<SendMoneyContextType>({
    sendMoney : { value : false},
    setSendMoney: () => {}
})

export function SendMoneyContextProvider({children}: {children : React.ReactNode}) {
    const [sendMoney, setSendMoney] = React.useState<IValue>({ value : false})

    return (
        <SendMoneyContext.Provider value={{sendMoney,setSendMoney}}>
            {children}
        </SendMoneyContext.Provider>
    )
}


interface Values{
    firstName : string,
    lastName : string,
    accountId : number,
    amount? : number
}

interface ReceiverContextType{
    receiver : Values,
    setReceiver : React.Dispatch<React.SetStateAction<Values>>
}

export const ReceiverContext = React.createContext<ReceiverContextType>({
    receiver : {
        firstName : "",
        lastName : "",
        accountId : 0
    },
    setReceiver : () => {}
})

export function ReceiverContextProvider({children}: {children : React.ReactNode}){
    const [receiver , setReceiver] = useState<Values>({
        firstName : "",
        lastName : "" ,
        accountId : 0
    })
    return (
        <ReceiverContext.Provider value={{receiver,setReceiver}}>
            {children}
        </ReceiverContext.Provider>
    )
}