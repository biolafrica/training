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