import AuthForm from "@/app/components/authForm"
import Link from "next/link"

export default function Signup(){
  return(
    <div className="grid lg:grid-cols-2 h-screen">

      <div>
        <div className="md:w-3/5 mx-auto mt-15 p-5 ">
          <h4 className="text-2xl"><b>Create An Account</b></h4>
          <h4 className="mb-5">Create an account in less than 1 minute</h4>
          <AuthForm status={"register"}/>
          <h4>Already have an account? <Link href="/login" className="font-bold">Login</Link></h4>
        </div>
      </div>

      <div>
        <div className=" hidden lg:block w-1/2 mt-60">
          <img className="mb-5" src="/undraw_working-together_r43a.svg" alt="training picture" />
          <h4 className="font-bold text-center mb-1">Welcome to Training</h4>
          <h4 className="text-center">A training platform for food delivery Staff</h4>
        </div>
       
      </div>
   
    </div>
  )
}