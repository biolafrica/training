import { createClient } from "../supabase/server";

export async function checkExistingSession(userId){
  const supabase = await createClient();
  
  const {data:existingSession, error} = await supabase 
  .from("Sessions")
  .select("*")
  .eq("user_id", userId)
  .single()

  if(existingSession){
    return existingSession

  }else if(!existingSession){
    return {message :"No existing session for this user"}

  }else if(error){
    console.error("error fetching existing session:", error);
    throw new Error(error.message);
  }

 

}