import { useState } from "react";

export default function useForm(initialValues){

  const [formData, setFormdata] = useState(initialValues);

  const handleInputChange = ()=>{
    const name = e.target.name;
    const value = e.taget.value;
    setFormdata({...formData, [name]: value})
  }

  const resetForm = ()=>{
    setFormdata(initialValues)
  }

  return{formData, handleInputChange, resetForm}

}