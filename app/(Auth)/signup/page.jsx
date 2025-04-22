import AuthForm from "@/app/components/authForm"

export default function Signup(){
  return(
    <div>
      <h4 className="text-center mt-10"><b>Register</b></h4>
      <AuthForm status={"register"}/>
    </div>
  )
}