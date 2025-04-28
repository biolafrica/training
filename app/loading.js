"use client"
import React from "react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"

export default function Loading(){
  return(
    <div className="loading w-[100px] h-[100px] flex justify-center items-center">
      <DotLottieReact
        src="/Animation - 1745860913809.json"
        loop
        autoplay
      />

    </div>

  )
}