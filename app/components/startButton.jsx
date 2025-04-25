"use client"

import { useRouter } from "next/navigation"

export default function StartButton({id, existingSession}){
  const router = useRouter();
  
  const startTest = async()=>{

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
        router.push(`/test/${data.savedMessages.id}`)
      }
      
    } catch (error) {
      console.error("Error posting user id", error)
    }
    
  }

  const resumeTest = async()=>{

    try {
      const res = await fetch("http://localhost:3000/api/message/last", {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id})
      })

      const data = await res.json();

      if(data){
        router.push(`test/${data?.message.id}`)
      }else{
        throw new Error(data.error)
      }

    } catch (error) {
      console.error("Resume test error", error);
    }

  }

  const ViewReport = async()=>{
    // push to test/sessionid
  }

  return(
    <button onClick={StartTest}  className="text-center border bg-black text-white p-5 cursor-pointer">
      {existingSession.status === "in_progress" && "Resume Test"}
      {existingSession.status === "completed" && "View Report"}
      {existingSession.message && "Start Test"}
    </button>
  )

}