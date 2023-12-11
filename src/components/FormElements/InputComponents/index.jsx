import React from 'react'

const InputComponents = ({label, placeholder, type, onChange, value}) => {
  return (
    <div className='relative'>
      <p className='px-2 font-medium text-gray-600'>{label}</p>
      <input type={type || "text"} onChange={onChange} value={value} placeholder={placeholder}
        className='border placeholder-gray-400 focus:outline-none focus:border-black w-full p-4 text-base block bg-white border-gray-300 rounded-md'
      />
    </div>
  )
}

export default InputComponents
