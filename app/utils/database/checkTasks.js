import { NextResponse } from "next/server";
import { createClient } from "../supabase/server";

export async function CheckExistingSession(userId){
  const supabase = await createClient();
  
  const {data:existingSession} = await supabase 
  .from("Session")
  .select("*")
  .eq("user_id", userId)
  .eq("is_complete", false)
  .single()

  if(!existingSession){
    return NextResponse.json({error: "User not found"}, {status: 404})
  }

  return existingSession;

}