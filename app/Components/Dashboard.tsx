import Paytm from "./Paytm";

import DashHeader from "./DashHeader";
import UserAccBalance from "../lib/userAccount";

export default async function Dashboard(){
  const userAccountInfo = await UserAccBalance();
  let balance;
  
  if(userAccountInfo){
    balance = userAccountInfo.balance;
  }

  if(balance!=null || balance!=undefined)
    return(
    <div className="md:pt-3 pt-5">
        <DashHeader />
        {balance>=0 && 
        <Paytm balance={balance}></Paytm>}
    </div>
    );

    return(
      <div className="pt-3">
          <DashHeader />
          <div className="flex justify-center items-center mt-[10%]">
            <span className="text-2xl font-bold">
              Loading.....
            </span>
          </div>
      </div>
    )
}