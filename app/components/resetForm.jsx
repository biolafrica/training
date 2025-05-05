import { useState } from "react";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ResetForm(){

  const [email, setEmail] =  useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("")
  const supabase = createClient();
  const router = useRouter();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true)

    const {error} = await supabase.auth.resetPasswordForEmail(email);

    if(error){
      setErrorMessage(error.message);
      setLoading(false);
      return; 

    }

    router.push("/auth/reset")
    setLoading(false)

  }

  return(
    <form onSubmit={handleSubmit}>

      {errorMessage && (<p className="text-red-600">{errorMessage}</p>)}

      <label className="mb-5" >
        <h5>Email:</h5>
        <input 
          type="email" 
          name="email" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
      </label>
   

      <button disabled={loading} className="pri-btn">{loading? "loading.." : "Submit"}</button>

    </form>
  )
}