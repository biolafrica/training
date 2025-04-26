import AuthForm from "@/app/components/authForm"
import Image from "next/image"
import Link from "next/link"


export default function Login(){
  return(

    <div className="grid lg:grid-cols-2 h-screen">

      <div>
        <div className=" md:w-1/2 mx-auto mt-30 p-5 ">
          <h4 className="text-2xl"><b>Login To Account</b></h4>
          <h4 className="mb-5">Enter Login Details to access account</h4>
          <AuthForm status={"login"}/>
          <h4>Don't have an account? <Link href="/signup" className="font-bold">Signup</Link></h4>
        </div>
      </div>

      <div>
        <div className=" hidden lg:block w-1/2 mt-50">
          <img className="mb-5" src="/undraw_educator_6dgp.svg" alt="training picture" />
          <h4 className="font-bold text-center mb-1">Welcome back to Training</h4>
          <h4 className="text-center">Login to continue your training</h4>
        </div>
      </div>
     
    </div>
    
  )
}