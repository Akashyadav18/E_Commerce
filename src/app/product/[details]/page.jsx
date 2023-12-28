import CommonDetails from '@/components/CommonDetails';
import { productById } from '@/services/product'
import React from 'react'

const ProductDetails = async ({params}) => {

    const productDetailsData = await productById(params.details);
    console.log(productDetailsData);

  return (
    <div>
      <CommonDetails item={productDetailsData && productDetailsData.data}/>
    </div>
  )
}

export default ProductDetails
