import AuthForm from "@/app/components/authForm"

export default function Signup(){
  return(
    <div>
      <h4>Register</h4>
      <AuthForm status={"register"}/>
    </div>
  )
}