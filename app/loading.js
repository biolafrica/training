
"use client"
import Lottie from "lottie-react"
import animationData from "../public/Animation - 1745860913809.json"

export default function Loading() {
  return (
    <div className="w-[120px] h-[120px] flex justify-center items-center mx-auto">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  )
}
