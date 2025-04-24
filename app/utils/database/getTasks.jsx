import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";

export async function getUserRole(userId){
  const supabase = await createClient();
  
  const {data:user} = await supabase 
  .from("User")
  .select("role")
  .eq("user_id", userId)
  .single()

  if(!user){
    return NextResponse.json({error: "User not found"}, {status: 404})
  }

  return user;

}

export async function getMessage(messageId){
  const supabase = await createClient();

  const {data: message, error} = await supabase
  .from("Messages")
  .select()
  .eq("id", messageId)
  .single()


  if(error){
    console.error("error fetching message:", error.message);
    throw new Error(error.message);
  }

  return message;


}

export async function getSession(sessionId){
  const supabase = await createClient();

  const {data: session, error} = await supabase
  .from("Sessions")
  .select()
  .eq("id", sessionId)
  .single()

  if(error){
    console.error("error fetching session:", error.message);
    throw new Error(error.message);
  }

  return session;

}