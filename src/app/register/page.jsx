import InputComponents from '@/components/FormElements/InputComponents'
import SelectComponents from '@/components/FormElements/SelectComponents'
import { registrationFormControls } from '@/utils';
import React from 'react'

const isRegistered = false;

const Register = () => {
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
                  <InputComponents type={controlItem.type} placeholder={controlItem.placeholder} label={controlItem.label} />
                ) :
                  controlItem.componentType === 'select' ? (
                    <SelectComponents options={controlItem.options} label={controlItem.label} />
                  ) : null
              ))
            }
            <button className='inline-flex items-center justify-center mt-5  bg-black px-6 py-2 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium tracking-wide'>
              Register
            </button>
          </div>
        }
      </div>
    </div>
  )
}

export default Register
