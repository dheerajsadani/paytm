
import { getServerSession } from "next-auth";
import Dashboard from "./Components/Dashboard";
import { redirect } from "next/navigation";

export default async function Home() {
  
type ISODateString = string;

interface Session {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
  expires: ISODateString
}
  const session = await getServerSession();
  if(!session){
    redirect("/auth/signin")
  }
  if(session!= null){
    return(
    <>
      <Dashboard />
    </>
    )
  }
  
}
