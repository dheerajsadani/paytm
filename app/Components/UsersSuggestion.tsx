import randomUserData from "../lib/randomUser";
import UserLookUp from "./UserLookUp";

export default async function UsersSuggestion(){

    interface UserType{
        firstName : string,
        lastName : string,
        accountId: number
    }

    const randomUsers:UserType[] = await randomUserData();
    
    return(
        <>
            <UserLookUp randomUsers={randomUsers}/>
        </>
    )
}