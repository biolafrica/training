'use client'

import { useState } from "react";
import useForm from "../hooks/useForm";
import { createClient } from "../utils/supabase/client";
import { useRouter } from "next/navigation";


export default function AuthForm({status}){

  const initialValues ={
    first_name : "",
    last_name : "",
    password: "",
    email: "",
    role: ""

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

    if(status === "register"){
      const {data, error} = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password
      })

      if(data?.user?.id){

        const userData = {
          user_id : data.user.id,
          email : formData.email,
          first_name : formData.first_name,
          last_name: formData.last_name,
          role: formData.role
        }

        await addUser(userData);

        const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/user`,{
          method: "POST",
          headers:{"Content-Type" : "application/json"},
          body: JSON.stringify(userData),
        });

        const newUser = await res.json();
        if(newUser.data){
          router.push("/auth/verify")
          resetForm();
        }
        
      }

      if(error){
        setErrorMessage(error.message);
        setLoading(false)
        return;
      }
     
    }else{
      const{error} = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      })

      if(error){
        return setErrorMessage(error.message)
      }

      router.push("/")
      resetForm()
    }

    setLoading(false);
  
  }

  return(
    <form className="border rounded-sm text-center" onSubmit={handleSubmit}>

      {errorMessage && <h4 className="text-red-600">{errorMessage}</h4>}

      {status === "register" && (
        <>
          <label htmlFor="first_name">
            <h5>First Name</h5>
            <input 
              type="text" 
              name="first_name" 
              value={formData.first_name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="last_name">
            <h5>Last Name</h5>
            <input 
              type="text" 
              name="last_name" 
              value={formData.last_name}
              onChange={handleInputChange}
              required
            />
          </label>

          <label htmlFor="role">
            <h5>Role</h5>
            <select 
              name="role" 
              value={formData.role}   
              onChange={handleInputChange}  
              required 
            >
              <option value="cutomer_experience"><h5>Customer Experience</h5></option>
              <option value="order_manager"><h5>Order Manager</h5></option>
              <option value="runner">Runner</option>
              <option value="runner">Rider</option>
              <option value="runner">Supervisor</option>
            </select>
          </label>

        </>

      )}

      <label htmlFor="email">
        <h5>Email</h5>
        <input 
          type="email" 
          name="email" 
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </label>

      <label htmlFor="password">
        <h5>Password</h5>
        <input 
          type="password" 
          name="password" 
          value={formData.password}
          onChange={handleInputChange}
          required
        />
      </label>

      <button type="submit" disabled={loading}>
        {status === "register" ?(<h5>Register</h5>):(<h5>Login</h5>)}
      </button>
    
    </form>
  )

}