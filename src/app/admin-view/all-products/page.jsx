import CommonListing from '@/components/CommonListing'
import { getAllAdminProducts } from '@/services/product'
import React from 'react'

const AdminAllProducts = async () => {

  const allAdminProducts = await getAllAdminProducts();
  console.log(allAdminProducts);

  return (
    <div>
      <CommonListing data={allAdminProducts && allAdminProducts.data}/>
    </div>
  )
}

export default AdminAllProducts
