import { createClient } from "../supabase/server";

export async function addUser(User){
  const supabase = await createClient();

  const {data, error} = await supabase
  .from("Users")
  .insert([User])
  .select()
  .single()

  if(error){
    console.log(error.message)
  }

  return data;
}