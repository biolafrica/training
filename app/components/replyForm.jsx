"use client"

import { useEffect, useState } from "react";
import QuestionForm from "./questionForm";
import CompletedQuestion from "./completedAns";


export default function ReplyForm({message}){
  const {sessionId, id: questionId} = message;
  const [sessionActive, setSessionActive] = useState(false);
  const [hasAnswer, setHasAnswer] = useState(null);
  const [finalQuestion, setFinalQuestion]= useState(false)


  useEffect(()=>{
    const CheckSessionAndAnswer=async()=>{
      try {
        const res = await fetch("http://localhost:3000/api/message/status/", {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({sessionId, questionId})
        })
        
        const data = await res.json();

        if(!res.ok){
          throw new Error(data.error || "Failed to fetch session and question details")
        }

        if(data.status === "in_progress" && (data.answer).length === 0){
          setSessionActive(true)
        }else if(data.status === "in_progress" && (data.answer).length !== 0){
          setHasAnswer(data.answer[0])
        }else if(data.status === "completed" && (data.answer).length === 0){
          setFinalQuestion(true)
        }

      } catch (error) {
        console.error("Resume test error", error);
        
      }
    }

    CheckSessionAndAnswer();

  }, [sessionId, questionId])

 
  return(
    <>
      {sessionActive && ( <QuestionForm sessionId={sessionId} questionId={questionId}/> )}
      {hasAnswer && (<CompletedQuestion reply={hasAnswer.messages}/>)}
      {finalQuestion && (<button className="pri-btn my-5">Go Home</button>)}

    </>
  )
   

}