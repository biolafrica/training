import { useState } from "react";

export default function useForm(initialValues){

  const [formData, setFormdata] = useState(initialValues);

  const handleInputChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setFormdata({...formData, [name]: value})
  }

  const resetForm = ()=>{
    setFormdata(initialValues)
  }

  return{formData, handleInputChange, resetForm}

}