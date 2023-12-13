"use client"

import InputComponents from '@/components/FormElements/InputComponents'
import { loginFormControls } from '@/utils'
import { useRouter } from 'next/navigation'
import React from 'react'

const Login = () => {

  const router = useRouter()

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
                <InputComponents type={controlItem.type} placeholder={controlItem.placeholder} label={controlItem.label} />
              ) : null
            ))
          }
          <button className='inline-flex items-center justify-center mt-5  bg-black px-6 py-2 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium tracking-wide'>
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
