"use client"

import axios from "axios";
import { useContext, useRef, useState } from "react";
import { useEffect } from "react";
import UserMiniCard from "./UserMiniCard";
import { ReceiverContext, SendMoneyContext } from "./Context/ContextProvider";


export default function UserLookUp(){
    const { setSendMoney} = useContext(SendMoneyContext);
    const {receiver , setReceiver} = useContext(ReceiverContext);

    const userInputRef = useRef<HTMLInputElement>(null);

    const [searchField , setSearchField] = useState("");
    const [users , setUsers] = useState([]);
    const [randomUsers, setRandomUsers] = useState([]);

    interface UserType{
        firstName : string,
        lastName : string,
        accountId: number
    }

    function inputHandler(e: any){
        setSearchField(e.target.value);
    }

    async function randomUsersFetch(){
        const result = await axios("/api/v1/randomuserdata");
        let data = await result.data;
        data = data.result
        if(data){
            setRandomUsers(data);
        }
    }
    useEffect(() => {

        if(!searchField){
            return
        }
        let data : any;
        async function usersFetch(){
            const response = await axios.post("/api/v1/userByName",{
                nameKeyword: searchField
            })

            // console.log("response")
            // console.log(response)

            if(response){
                data = await response.data;

                if(data.users){
                    setUsers((v: any)=>{
                        const usersData = v;
                        return data.users

                    } )
                }
            }
        }

        usersFetch();
    },[searchField])


    useEffect(()=> { 
        randomUsersFetch();
        
        function backspaceKeyHandler(e:any){
            if(e.key == "Backspace"){
                setUsers([]);
            }
        }
        userInputRef.current?.addEventListener("keydown",backspaceKeyHandler);

        return ()=> userInputRef.current?.removeEventListener("keydown",backspaceKeyHandler);
    },[])
    return(
        <div>
            <div className="text-base pt-3 flex pl-5 gap-3 flex-col">
                <span className="font-bold">Users</span>
                <input onChange={inputHandler} ref={userInputRef} className="w-[97%] h-9 border px-3 rounded-md border-gray-400 placeholder-gray-500 outline-none" type="text" placeholder="Search users..."></input>
            </div>

            {searchField.length >0 && users.length>0 ?
            <div className="bg-gray-200 ml-5 w-[95.4%] rounded-b-md pb-2 pl-1 pt-1">
                {users.map((x:any,id)=> 
                    <div key={id} className="pl-2 pr-4 pt-1 hover:bg-gray-300 w-fit rounded-lg flex items-center cursor-pointer relative mb-1.5">
                        <button className="cursor-pointer" onClick={()=> {
                            setSendMoney({value: true});
                            setReceiver((v:any)=> {
                                return {
                                    firstName: `${x.firstName}`,
                                    lastName: `${x.lastName}`,
                                    accountId: x.accountId
                                }
                            })
                            console.log(receiver);
                        }}>{x.firstName} {x.lastName}</button>
                        <div className="border-[#fdfdfd] border-[0.1px] -bottom-px  absolute w-[90%] pr-4 mt-0.5"></div>
                    </div>
                )}
            </div>
            : 
            <>
                {randomUsers.length>0 ?
                <div className="pl-9 flex flex-col gap-4 pt-7">
                    {randomUsers.map((x:UserType,id:number)=> 
                        <div key={id}>
                            <UserMiniCard randomUser={x}/>
                        </div>)
                    }
                </div>
                 : 
                 <></>
                }
                
            </>
                
            }
        </div>
    )
}





