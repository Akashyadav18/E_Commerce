import React from 'react'

const isRegistered = true

const Register = () => {
  return (
    <div className='bg-white relative max-w-7xl border mx-auto'>
    <div className='w-full p-4 flex flex-col justify-center items-center'>
      <p className='text-4xl font-medium text-center font-serif'>
        {isRegistered ? "Registration successful !" : "Sign in for an account"}
      </p>
      { isRegistered ? 
      <button className='inline-flex items-center justify-center  bg-black px-6 py-2 text-lg text-white transition-all duration-200 ease-in-out focus:shadow font-medium tracking-wide'>
        Login
      </button> : null}
    </div>
    </div>
  )
}

export default Register
