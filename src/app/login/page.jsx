"use client"

import InputComponents from '@/components/FormElements/InputComponents'
import { GlobalContext } from '@/context/Index'
import { loginFormControls } from '@/utils'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const initialFormData = {
  email : '',
  password : '',
}

const Login = () => {

  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();
  const {isAuthUser, setIsAuthUser, user, setUser, componentLevelLoader, setComponentLevelLoader} = useContext(GlobalContext);
  
  const handleLogin = async (e) => {
    setComponentLevelLoader({loading: true, id: ''});
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', formData);
      console.log("Data :",res.data);
      if(res.data.success) {
        toast.success(res.data.message, {
          position: "top-center"
        });
        setIsAuthUser(true);
        setUser(res?.data?.finalData?.user);
        setFormData(initialFormData);
        Cookies.set('token', res?.data?.finalData?.token);
        localStorage.setItem('user', JSON.stringify(res?.data?.finalData?.user));
        setComponentLevelLoader({loading: false, id: ''});
      } else {
        toast.error(res.data.message, {
          position: "top-center"
        });
        setIsAuthUser(false);
        setComponentLevelLoader({loading: false, id: ''});
      }
    } catch (error) {
      console.log(error);
    } 
    // finally {
    //   setFormData({email: '', password: ''});
    // }
  }

  console.log(isAuthUser, user);

  useEffect(() => {
    if(isAuthUser) router.push('/');
  }, [isAuthUser])

  function isValidForm() {
    return formData 
    && formData.email && formData.email.trim() !== ''
    && formData.password && formData.password.trim() !== '' ? true : false
  }

  return (
    <div className='bg-white relative max-w-[70%] p-10 m-auto shadow-md '>
      <div className='w-full flex flex-col justify-center items-center gap-5'>
        <p className='text-4xl font-medium text-center font-serif'>
          Login
        </p>
        <div className='w-full flex flex-col gap-3'>
          {
            loginFormControls.map((controlItem) => (
              controlItem.componentType === 'input' ? (
                <InputComponents key={controlItem.id} value={formData[controlItem.id]} onChange={(e) => {setFormData({ ...formData, [controlItem.id] : e.target.value})}} type={controlItem.type} placeholder={controlItem.placeholder} label={controlItem.label} />
              ) : null
            ))
          }
          <button disabled={!isValidForm()} onClick={handleLogin} className={`inline-flex disabled:opacity-50 items-center justify-center mt-5  bg-black px-6 py-2 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium tracking-wide`}>
            Login
          </button>
          <div className='flex flex-col gap-2'>
            <p>New to website ?</p>
            <button className='inline-flex items-center justify-center  bg-black px-6 py-2 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium tracking-wide'
            onClick={() => router.push('/register')}
            >
            Register
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
