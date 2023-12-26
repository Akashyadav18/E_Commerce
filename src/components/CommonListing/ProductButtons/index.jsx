"use client"

import ComponentLevelLoader from '@/components/Loader/componentLevel';
import { GlobalContext } from '@/context/Index';
import { deleteAProduct } from '@/services/product';
import { usePathname, useRouter } from 'next/navigation'
import React, { useContext } from 'react'
import toast from 'react-hot-toast';

const ProductButton = ({ item }) => {

  const pathName = usePathname();
  const { setCurrentUpdatedProduct, setComponentLevelLoader, componentLevelLoader } = useContext(GlobalContext);
  const router = useRouter()
  const isAdminView = pathName.includes('admin-view');

  const handleDeleteProduct = async (item) => {
    setComponentLevelLoader({loading: true, id: item._id});
    const res = await deleteAProduct(item._id);
    if(res.success) {
      setComponentLevelLoader({loading: false, id: ""});
      toast.success(res.message, {position: "top-center"});
      router.refresh(); 
    } else {
      toast.error(res.message, {position: "top-center"});
      setComponentLevelLoader({loading: false, id: ""});
    }
  }

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push("/admin-view/add-product")
        }}
        className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 font-medium uppercase tracking-wide text-white'>
        Update</button>
      <button onClick={() => handleDeleteProduct(item)} className='mt-1.5 flex w-full justify-center bg-black px-5 py-3 font-medium uppercase tracking-wide text-white'>
      {
        componentLevelLoader && componentLevelLoader.loading && item._id === componentLevelLoader.id ? 
        <ComponentLevelLoader 
          text={"Deleting"} color={"#ffffff"} loading={componentLevelLoader && componentLevelLoader.loading}
        /> : "DELETE"
      }
      </button>
    </>
  ) : (
    <>
      <button className='mt-1.5 flex w-full justify-center items-center bg-black px-5 py-3 font-medium uppercase tracking-wide text-white'>Add to Cart</button>
    </>
  )

}

export default ProductButton
