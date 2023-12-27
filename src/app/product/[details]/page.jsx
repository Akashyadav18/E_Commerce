import { productById } from '@/services/product'
import React from 'react'

const ProductDetails = async ({params}) => {

    const productDetailsData = await productById(params.details);
    console.log(productDetailsData);

  return (
    <div>
      Details
    </div>
  )
}

export default ProductDetails
