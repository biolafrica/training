
"use client"

import dynamic from "next/dynamic";


import animationData from "../public/Animation - 1745860913809.json"
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Loading() {
  return (
    <div className="w-[120px] h-[120px] flex justify-center items-center mx-auto">
      <Lottie animationData={animationData} loop autoplay />
    </div>
  )
}
