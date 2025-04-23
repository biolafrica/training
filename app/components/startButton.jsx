"use client"

import { useRouter } from "next/navigation"

export default function StartButton({id, existingSession}){
  
  const StartTest = async()=>{
    const router = useRouter();

    try {
      const res = await fetch("http://localhost:3000/api/session/start/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({id})
      })

      const data = await res.json();
      if(data){
        router(`/test/${data.savedMessages.id}`)
      }
      
    } catch (error) {
      console.error("Error posting user id", error)
    }
    
  }

  return(
    <button onClick={StartTest}  className="text-center border bg-black text-white p-5 cursor-pointer">
      {existingSession.status === "in_progress" && "Resume Test"}
      {existingSession.status === "completed" && "View Report"}
      {existingSession.message && "Start Test"}
    </button>
  )

}