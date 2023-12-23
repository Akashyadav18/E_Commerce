import { usePathname } from 'next/navigation'
import React from 'react'

const ProductButton = () => {

  const pathName = usePathname();
  const isAdminView = pathName.includes('admin-view');

  return isAdminView ? (
    <>
      <button className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 font-medium uppercase tracking-wide text-white'>
      Update</button> 
      <button className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 font-medium uppercase tracking-wide text-white'>
      Delete</button>
    </>
  ) : (
    <>
      <button>Add to Cart</button>
    </>
  )

}

export default ProductButton
