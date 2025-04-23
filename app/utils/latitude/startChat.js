import { NextResponse } from "next/server";
import { Latitude } from "@latitude-data/sdk";
import { createClient } from "../supabase/server";

export async function StartConversation(userRole, newSession, userId){
  
  const supabase = await createClient();
  const sessionId = "12bff74a-90d0-4822-b05e-ad741f88636e"

}