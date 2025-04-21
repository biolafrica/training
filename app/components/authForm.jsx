'use client'

import { useState } from "react";
import useForm from "../hooks/useForm";


export default function AuthForm({status}){

  const initialValues ={
    first_name : "",
    last_name : "",
    password: "",
    email: "",
    role: ""

  }

  const [loading, setLoading] = useState(false);
  const {formData, handleInputChange, resetForm} = useForm(initialValues);

  const handleSubmit=()=>{
    console.log("Yes")
  }

  return(
    <form className="auth_form" onSubmit={handleSubmit}>

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
        {state === "register" ?(<h5>Register</h5>):(<h5>Login</h5>)}
      </button>
    
    </form>
  )

}