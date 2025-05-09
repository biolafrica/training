'use client'

import { useState } from "react";
import useForm from "../hooks/useForm";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function AuthForm({status}){
  const initialValues ={
    first_name : "",
    last_name : "",
    password: "",
    email: "",
    role: "cutomer_experience"

  }

  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {formData, handleInputChange, resetForm} = useForm(initialValues);

  const handleSubmit= async(e)=>{
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      
      if(status === "register"){
        const {data:registeredUser, error: signUpError} = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password
        })

        if(signUpError){
          setErrorMessage(signUpError.message);
          setLoading(false)
          throw new Error(signUpError.message);
        }

        const user = registeredUser?.user;
        if(!user) throw new Error("User ID not returned")

        const userData = {
          user_id : user.id,
          email : formData.email,
          first_name : formData.first_name,
          last_name: formData.last_name,
          role: formData.role
        }
        
        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`,{
          method: "POST",
          headers:{"Content-Type" : "application/json"},
          body: JSON.stringify(userData),
        });

        const newUser = await res.json();
        if (!newUser?.data){ 
          setErrorMessage("Email has been registered")
          setLoading(false)
          throw new Error("Failed to save user data")
        };

        router.push("/auth/verify")
        resetForm();
      
      }else{
        const{error:signInError} = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password
        })

        if (signInError){
          setErrorMessage(signInError.message);
          setLoading(false);
          throw new Error(signInError.message);
        }

        router.push("/")
        resetForm()
      }

    } catch (error) {
      setErrorMessage(error.message || "Something went wrong");
      setLoading(false);
    }


  
  }

  return(
    <form onSubmit={handleSubmit}>

      {errorMessage && <h4 className="text-red-600 text-center">{errorMessage}</h4>}

      {status === "register" && (
        <>
          <label className="mb-3">
            <h5>First Name:</h5>
            <input 
              type="text" 
              name="first_name" 
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="mb-3">
            <h5>Last Name:</h5>
            <input 
              type="text" 
              name="last_name" 
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label className="mb-3">
            <h5>Role:</h5>
            <select 
              name="role" 
              value={formData.role}   
              onChange={handleInputChange}  
              required 
            >
              <option value="cutomer_experience">Customer Experience</option>
              <option value="order_manager">Order Manager</option>
              <option value="runner">Runner</option>
              <option value="rider">Rider</option>
              <option value="supervisor">Supervisor</option>
            </select>
          </label>

        </>

      )}

      <label className="mb-5">
        <h5>Email:</h5>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </label>

      <label className="mb-1">
        <h5>Password:</h5>
        <input 
          type="password" 
          name="password" 
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </label>

      {status == "login" && (<h4 className="mb-5">Forget Password? <Link href="/reset" className="font-bold">Reset Password</Link></h4>)}

      <button className="pri-btn mb-1 mt-4 " type="submit" disabled={loading}>
        {loading ?(<h5>loading...</h5>):(<h5>Submit</h5>)}
      </button>
    
    </form>
  )

}