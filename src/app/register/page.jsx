"use client";

import InputComponents from '@/components/FormElements/InputComponents'
import SelectComponents from '@/components/FormElements/SelectComponents'
import { registrationFormControls } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const isRegistered = false;

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
}

const Register = () => {

  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  function isFormValid() {
    return formData 
    && formData.name && formData.name.trim() !== ''
    && formData.email && formData.email.trim() !== ''
    && formData.password && formData.password.trim() !== '' ? true : false
  }

  async function handleRegister (e) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", formData);
      console.log(res.data);
      router.push('/login');
    } catch (error) {
      console.log(error);
    } finally {
      setFormData({name: "", email: "", password: ""})
    }
  }

  return (
    <div className='bg-white relative max-w-[70%] px-6 m-auto shadow-md '>
      <div className='w-full p-4 flex flex-col justify-center items-center gap-5'>
        <p className='text-4xl font-medium text-center font-serif'>
          {isRegistered ? "Registration successful !" : "Sign in for an account"}
        </p>
        {isRegistered ?
          <button className='inline-flex items-center justify-center  bg-black px-6 py-2 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium tracking-wide'>
            Login
          </button>
          :
          <div className='w-full flex flex-col gap-3'>
            {
              registrationFormControls.map((controlItem) => (
                controlItem.componentType === 'input' ? (
                  <InputComponents key={controlItem.id} type={controlItem.type} onChange={(e) => setFormData({ ...formData, [controlItem.id]: e.target.value })} value={formData[controlItem.id]} placeholder={controlItem.placeholder} label={controlItem.label} />
                ) :
                  controlItem.componentType === 'select' ? (
                    <SelectComponents key={controlItem.id} options={controlItem.options} onChange={(e) => setFormData({ ...formData, [controlItem.id]: e.target.value })} value={formData[controlItem.id]} label={controlItem.label} />
                  ) : null
              ))
            }
            <button disabled={!isFormValid()} onClick={handleRegister} className='inline-flex disabled:opacity-50 items-center justify-center mt-5  bg-black px-6 py-2 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium tracking-wide'>
              Register
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Register
