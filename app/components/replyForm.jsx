"use client"

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ReplyForm({message}){
  const {sessionId} = message;
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const handleQuestionSubmit =async(e)=>{
    e.preventDefault();
    setLoading(true)

    const formData = {
      sessionId,
      messages: answer,
      sender : "user"
    }

    try {
      const res = await fetch("http://localhost:3000/api/session/resume", {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(data){
        router.push(`/test/${data.savedMessages.id}`)
      }
      
      
    } catch (error) {
      console.log(error)
    }

    setLoading(false)

  }

  return(

    <form className="m-5" onSubmit={handleQuestionSubmit}>
      <textarea
        name="answer"
        value={answer}
        onChange={(e)=>setAnswer(e.target.value)} 
        required
      ></textarea>
      <button  disabled={loading} className="pri-btn">
        {loading? "loading..." : "Next Question"}
      </button>
    </form>

  )
   

}