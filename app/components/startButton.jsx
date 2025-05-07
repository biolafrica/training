"use client"

import { useRouter } from "next/navigation"
import { useState } from "react";

export default function StartButton({id, existingSession}){
  const sessionId = existingSession?.id;
  const router = useRouter();
  const [loading, setLoading]= useState(false)

  const handleButtonClick = async()=>{
    setLoading(true);
    try {
      if(existingSession?.status === "in_progress"){
        await resumeTest();
      }else if(existingSession?.status === "completed"){
        await viewReport();
      }else if(existingSession.message){
        await startTest();
      }

    } catch (error) {
      console.error("Handle button error:", error);
      
    }

    setLoading(false)
  }
  
  const startTest = async()=>{
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/session/start/`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({id})
      })

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Error starting test");
      router.push(`/test/${data.savedMessages.id}`);
      
    } catch (error) {
      console.error("Error starting test", error)
    }
    
  }

  const resumeTest = async()=>{
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/message/last`, {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({sessionId})
      })

      const {data} = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to fetch last message")
      };

      router.push(`/test/${data.id}`)

    } catch (error) {
      console.error("Resume test error", error);
    }

  }

  const viewReport = async()=>{
    router.push(`/report/${sessionId}`)
  }

  const getButtonText = ()=>{
    if (existingSession.status === "in_progress") return "Resume Test";
    if (existingSession.status === "completed") return "View Report";
    if (existingSession.message) return "Start Test";
  }

  return(
    <button disabled={loading} onClick={handleButtonClick} className="pri-btn">
      {loading ? "loading.." : getButtonText()}
    </button>
  )

}