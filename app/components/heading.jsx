"use client"
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

export default function Heading({type}){
  const router = useRouter();

  const handleLogout=async()=>{
    const supabase =  createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      console.log("Successfully logged out");
      router.push("/login")
    }
  }

  return(
    <div className="flex justify-between px-5 py-7 lg:px-20  border-b border-gray-100 mb-5">
      <img src={`/${type}.svg`} alt={`${type} icon`} />
      <img onClick={handleLogout} className="cursor-pointer" src="/Logout.svg" alt="logout icon" />
    </div>
  )
}