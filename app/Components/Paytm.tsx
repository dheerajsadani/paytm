
import PaytmHero from "./PaytmHero"
import UsersSuggestion from "./UsersSuggestion"

interface PaytmType{
    children: React.ReactNode, 
    user: {
        userInfo: {
            firstName: string,
            lastName: string,
            email: string
        }
    },
    balance:number
}


export default async function Paytm({children, user,balance}:PaytmType){
    
    return(
        <div className=" bg-white min-h-[500px] max-h-full w-full text-xl pt-1">
            <div className="pb-3 border-b border-gray-300 flex items-center">
                <span className="font-semibold pl-5 pt-1 StackSansHeadline">Payments App</span>
                <div className="absolute right-5">
                    {children}
                </div>
            </div>
            <div className="text-base pb-3 pt-3 flex pl-5 gap-3 items-center">
                <span className="font-bold">Your Balance</span>
                <span className={`font-semibold border px-2 rounded-lg ${balance>0 ? "bg-green-200" : "bg-red-200"}`}>${balance}</span>
            </div>
            
            <PaytmHero balance={balance} >
                <UsersSuggestion />
            </PaytmHero>
            
        </div>
    )
}