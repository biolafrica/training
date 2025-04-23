import { redirect } from "next/navigation";
import { createClient } from "./server";

export default async function fetchUser(){
  const supabase  = await createClient();

  const{data, error} = await supabase.auth.getUser();
  

  if(error || !data?.user){
    redirect("/login")
  }

  return data;
}