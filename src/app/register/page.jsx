"use client";

import InputComponents from '@/components/FormElements/InputComponents'
import SelectComponents from '@/components/FormElements/SelectComponents'
import ComponentLevelLoader from '@/components/Loader/componentLevel';
import { GlobalContext } from '@/context/Index';
import { registrationFormControls } from '@/utils';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import toast from 'react-hot-toast';

const isRegistered = false;

const initialFormData = {
  name: "",
  email: "",
  password: "",
  role: "customer",
}

const Register = () => {

  const {componentLevelLoader, setComponentLevelLoader} = useContext(GlobalContext);

  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  function isFormValid() {
    return formData 
    && formData.name && formData.name.trim() !== ''
    && formData.email && formData.email.trim() !== ''
    && formData.password && formData.password.trim() !== '' ? true : false
  }

  async function handleRegister (e) {
    setComponentLevelLoader({loading: true, id: ''});
    e.preventDefault();
    try {
      const res = await axios.post("/api/register", formData);
      if(res.data.success) {
        
        toast.success(res.data.message, {
          position: "top-center"
        });
        router.push('/login');
        setComponentLevelLoader({loading: false, id: ""})
      }
    } catch (error) {
      console.log(error);
      toast.error(res.data.message, {
        position: "top-center"
      });
      setComponentLevelLoader({loading: false, id: ""});
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
            {componentLevelLoader && componentLevelLoader.loading ? (
              <ComponentLevelLoader text={"Registering"} color={"#ffffff"} loading={componentLevelLoader && componentLevelLoader.loading} />
            ): (
              "Register"
            )}
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Register
