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