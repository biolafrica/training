import { createClient } from "../supabase/server";

export async function addUser(UserData){

  const supabase = await createClient();

  const {data, error} = await supabase
  .from("User")
  .insert([UserData])
  .select()
  .single()

  if(error){
    console.error("Add user error:", error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function createNewSession(userId, userRole){
  const supabase = await createClient();

  const {data: newSession, error} = await supabase 
  .from("Sessions")
  .insert({user_id: userId, role: userRole,  status: "in_progress",
    startedAt: new Date(),})
  .select()
  .single()

  if(error){
    console.error("Add user error:", error.message);
    throw new Error(error.message);
  }

  return newSession;

}