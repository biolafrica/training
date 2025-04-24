import { createClient } from "../supabase/server";

export async function markSessionComplete(sessionId){
  const supabase = await createClient();

  const {error} = await supabase
  .from("Sessions")
  .update({status: 'completed', endedAt : new Date().toISOString()})
  .eq("id", sessionId)

  if(error){
    console.error("Add report error:", error.message);
    throw new Error(error.message);
  }
 
}