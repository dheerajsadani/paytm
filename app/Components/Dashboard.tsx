import Paytm from "./Paytm";

import DashHeader from "./DashHeader";
import UserInfo from "./UserInfo";
import userData from "../lib/user";
import UserAccBalance from "../lib/userAccount";
import { SendMoneyProvider , ReceiverProvider} from "./ContextProvider";
import { useContext } from "react";

export default async function Dashboard(){
  
  const userDataRes=  await userData();
  let user;
  if(userDataRes){
    user = await userDataRes.json();
  }
  const userAccountRes = await UserAccBalance();
  let userAccountInfo;
  let balance;
  if(userAccountRes){
    userAccountInfo = await userAccountRes.json();
    balance = userAccountInfo.balance;
  }
    return(
      <div className="pt-3">
        <SendMoneyProvider>
          <ReceiverProvider>
            <DashHeader />
            <div>
              <Paytm user={user} balance={balance}>
                    <UserInfo user={user}/>
              </Paytm>
            </div>
          </ReceiverProvider>
          
        </SendMoneyProvider>
        
      </div>
    );
  }