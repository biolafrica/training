import PasswordResetForm from "@/app/components/passwordResetForm";

export default function ResetPasswords() {
  const { token } = router.query;

  return(
    <div className="grid lg:grid-cols-2 h-screen">

      <div>
        <div className=" md:w-1/2 mx-auto mt-30 p-5 ">
          <h4 className="text-2xl"><b>Reset Password</b></h4>
          <h4 className="mb-5">Enter your new password</h4>
           <PasswordResetForm token={token}/>
        </div>
      </div>

      <div>
        <div className=" hidden lg:block w-1/2 mt-50">
          <img className="mb-5" src="/undraw_educator_6dgp.svg" alt="training picture" />
          <h4 className="font-bold text-center mb-1">AI Staff Training</h4>
          <h4 className="text-center">Enter your new password</h4>
        </div>
      </div>
     
    </div>
   
  )

}