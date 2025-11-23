import Paytm from "./Paytm";

import DashHeader from "./DashHeader";
import UserAccBalance from "../lib/userAccount";

export default async function Dashboard(){
  const userAccountInfo = await UserAccBalance();
  let balance;
  
  if(userAccountInfo){
    balance = userAccountInfo.balance;
  }
    return(
      <div className="pt-3">
          <DashHeader />
          {balance && 
          <Paytm balance={balance}></Paytm>}
      </div>
    );
  }