import React from 'react'

const SelectComponents = ({label, value, onchange, options=[]}) => {
  return (
    <div className='relative'>
      <p className='pt-0 pr-2 pb-0 pl-2 mr-0 mb-0 ml-2 font-medium text-gray-600'>{label}</p>
      <select value={value} onChange={onchange} className='border placeholder-gray-400 focus:outline-none focus:border-black w-full p-3 text-base block bg-white border-gray-300'>
        {
          options && options.length ? 
          options.map((optionItem) => (
            <option id={optionItem.id} value={optionItem.id} key={optionItem.id}>{optionItem.label}</option>
          ))
          :
          <option id='' value={''}>Select</option>
        }
      </select>
    </div>
  )
}

export default SelectComponents
