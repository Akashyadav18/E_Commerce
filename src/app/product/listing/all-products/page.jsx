import CommonListing from '@/components/CommonListing';
import { getAllAdminProducts } from '@/services/product'
import React from 'react'

const AllProducts = async () => {

    const getAllProducts = await getAllAdminProducts();

  return (
    <CommonListing data={getAllProducts && getAllProducts.data}/>
  )
}

export default AllProducts
