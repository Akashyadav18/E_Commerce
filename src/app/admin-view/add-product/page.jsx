"use client"

import InputComponents from '@/components/FormElements/InputComponents'
import SelectComponents from '@/components/FormElements/SelectComponents'
import TileComponent from '@/components/FormElements/TileComponents'
import { AvailableSizes, adminAddProductformControls } from '@/utils'
import React from 'react'

const AdminAddNewProduct = () => {

  function handleImage() {

  }

  return (
    <div className='w-full mt-3'>
      <div className='flex flex-col justify-start items-start p-10 shadow-md'>
        <div className='w-full space-y-8'>
          <input accept='image/*' max="1000000" type='file' onChange={handleImage} />
          <div className='flex gap-2 flex-col'>
            <label>Available size</label>
            <TileComponent data={AvailableSizes} />
          </div>
        </div>
        <div className='w-full flex flex-col gap-4 mt-4'>
          {
            adminAddProductformControls.map((controlItem) => (
              controlItem.componentType === 'input' ?
                <InputComponents type={controlItem.type} placeholder={controlItem.placeholder} label={controlItem.label} />
                :
                controlItem.componentType === 'select' ?
                  <SelectComponents label={controlItem.label} options={controlItem.options} />
                  : null
            ))
          }
          <button className='py-2 border border-black hover:bg-black hover:text-white'>Add Product</button>
        </div>
      </div>
    </div>
  )
}

export default AdminAddNewProduct
