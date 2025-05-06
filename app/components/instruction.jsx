"use client"

import { useState } from "react";

export default function Instruction (){

  const [display, setDisplay] = useState(false);

  const handleInstructionDisplay=()=>{
    display ?  setDisplay(false) :setDisplay(true)
  }

  return(

    <div className="col-span-1 bg-gray-50 p-10 ">

      <p className="font-bold mb-5 text-center">AI-Powered Food Delivery Staff Training and Assessment.</p>
      <p className="mb-2 font-medium text-center">Instructions:</p>
      <p className="lg:hidden font-bold text-blue-700 text-center cursor-pointer" onClick={handleInstructionDisplay} data-testid= "toggle">
        {display ? "close":"more"}
      </p>

      <div className={`text-gray-700 ${!display && "hidden"} lg:block`} >
        <p className="mb-2">1. Your training scenarios and questions are customized based on your selected role (e.g., Customer Experience Team, Order Manager, Runner, Supervisor, or Rider).</p>
        <p className="mb-2" data-testid="content">2. You'll be presented with one realistic work challenge at a time, think carefully and respond based on how you would act in a real situation.</p>
        <p className="mb-2">3. Once you submit an answer, you cannot edit or go back. Therefore, answer thoughtfully before clicking Next.</p>
        <p className="mb-3">4. You must complete all 10 questions to finish your training, However, if you get disconnected, you can resume exactly where you left off.</p>
        <p className="mb-4">5. Answer based on how you would truly respond at work, not what you think is the "perfect" answer. The goal is to assess real-world readiness.</p>
        <p className="mb-5">6. After the final question, a summary report will be sent to you, and a detailed report will be sent to your manager.</p>

      </div>

    </div>

  )
}