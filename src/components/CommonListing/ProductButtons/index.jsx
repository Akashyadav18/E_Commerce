"use client"

import { GlobalContext } from '@/context/Index';
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext } from 'react'

const ProductButton = ({ item }) => {

  const pathName = usePathname();
  const { setCurrentUpdatedProduct } = useContext(GlobalContext);
  const router = useRouter()
  const isAdminView = pathName.includes('admin-view');

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product")
        }}
        className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 font-medium uppercase tracking-wide text-white'>
        Update</button>
      <button onClick={() => console.log("Delete")} className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 font-medium uppercase tracking-wide text-white'>
        Delete</button>
    </>
  ) : (
    <>
      <button>Add to Cart</button>
    </>
  )

}

export default ProductButton
