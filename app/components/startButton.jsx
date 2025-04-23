"use client"

export default function StartButton({id, existingSession}){
  const StartTest = async()=>{
    console.log("start")
    
  }

  return(
    <button onClick={StartTest}  className="text-center border bg-black text-white p-5 cursor-pointer">
      {existingSession.status === "in_progress" ? "Resume Test" : 'View Report'}
      {existingSession.message && "Start Test"}
    </button>
  )

}