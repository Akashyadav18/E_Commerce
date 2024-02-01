"use client"

import CommonCart from '@/components/CommonCart';
import { GlobalContext } from '@/context/Index';
import { deleteFromCart, getAllCartItems } from '@/services/cart';
import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

const Cart = () => {

  const { user, setCartItems, cartItems, pageLevelLoader, setPageLevelLoader, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext)

  async function extractAllCartItems() {
    setPageLevelLoader(true)
    const res = await getAllCartItems(user?._id);
    console.log(res);
    if (res.success) {
      const updatedData =
        res.data && res.data.length
          ? res.data.map((item) => ({
            ...item,
            productID: {
              ...item.productID,
              price:
                item.productID.onSale === "yes"
                  ? parseInt(
                    (
                      item.productID.price -
                      item.productID.price * (item.productID.priceDrop / 100)
                    ).toFixed(2)
                  )
                  : item.productID.price,
            },
          }))
          : [];
      setCartItems(updatedData);
      setPageLevelLoader(false);
      localStorage.setItem('cartItems', JSON.stringify(updatedData));
    }
  }
  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  const handleDeleteCartItem = async (getCartItemID) => {
    setComponentLevelLoader({ loading: true, id: getCartItemID });
    const res = await deleteFromCart(getCartItemID);
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.success(res.message, { position: "top-right" });
      extractAllCartItems();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
      toast.error(res.message, { position: "top-right" });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    )
  }

  return (
    <CommonCart componentLevelLoader={componentLevelLoader} handleDeleteCartItem={handleDeleteCartItem} cartItems={cartItems} />
  )
}

export default Cart
