import AuthForm from "@/app/components/authForm"
import Image from "next/image"
import Link from "next/link"


export default function Login(){
  return(

    <div className="grid lg:grid-cols-2 h-screen">

      <div className="">
        <div className=" md:w-1/2 mx-auto mt-30 p-5 ">
          <h4 className="text-2xl"><b>Login To Account</b></h4>
          <h4 className="mb-5">Enter Login Details to access account</h4>
          <AuthForm status={"login"}/>
          <h4>Don't have an account? <Link href="/signup" className="font-bold">Signup</Link></h4>
        </div>
      </div>

      <div className="">
        <div className=" hidden lg:block w-1/2 mt-50">
          <img src="/undraw_educator_6dgp.svg" alt="training picture" />
        </div>
      </div>
     
    </div>
    
  )
}