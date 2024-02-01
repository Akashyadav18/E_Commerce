"use client"

import React, { Fragment, useContext, useEffect } from 'react'
import CommonModal from '../CommonModel'
import { GlobalContext } from '@/context/Index'
import { deleteFromCart, getAllCartItems } from '@/services/cart'
import toast from 'react-hot-toast'
import ComponentLevelLoader from '../Loader/componentLevel'
import { useRouter } from 'next/navigation'

const CartModel = () => {

  const { showCartModal, setShowCartModal, user, cartItems, setCartItems, componentLevelLoader, setComponentLevelLoader } = useContext(GlobalContext);
  const router = useRouter();

  async function extractAllCartItems() {
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

  return (
    <div>
      <CommonModal showButtons={true}
        show={showCartModal} setShow={setShowCartModal}
        mainContent={
          cartItems && cartItems.length ?
            <ul role='list' className='my-3 divide-y divide-gray-300'>
              {
                cartItems.map((cartItem) => (
                  <li key={cartItem.id} className='flex py-6'>
                    <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                      <img src={cartItem && cartItem.productID && cartItem.productID.imageUrl} alt={cartItem.id} className='h-full w-full object-cover object-center' />
                    </div>
                    <div className='ml-4 flex flex-1 flex-col'>
                      <div>
                        <div className='flex justify-between text-base font-medium text-gray-500'>
                          <h3>
                            <a>{cartItem && cartItem.productID && cartItem.productID.name}</a>
                          </h3>
                        </div>
                        <p className='mt-1 text-sm text-gray-600'>${cartItem && cartItem.productID && cartItem.productID.price}</p>
                      </div>
                      <div className='flex flex-1 items-end justify-between text-sm'>
                        <button onClick={() => handleDeleteCartItem(cartItem._id)} type='button' className='font-medium text-red-600 sm:order-2'>
                          {
                            componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.loading.id === cartItem._id ?
                              <ComponentLevelLoader text={"Removing"} color={"#000000"} loading={componentLevelLoader && componentLevelLoader.loading}
                              /> : "Remove"
                          }
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
            : null
        }
        buttonComponent={
          <Fragment>
            <div className='flex justify-evenly items-center gap-5'>
              <button type='button' onClick={() => {router.push("/cart"), setShowCartModal(false)}} className='w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide'>Go To Cart</button>
              <button onClick={() => {router.push("/checkout"), setShowCartModal(false)}} disabled={cartItems && cartItems.length === 0} type='button' className='w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50'>Check Out</button>
            </div>
            <div className='mt-6 flex justify-center text-center text-sm text-gray-600'>
              <button type='button' className='font-medium text-gray'>Continue Shopping <span aria-hidden="true">&rarr;</span></button>
            </div>
          </Fragment>
        } />
    </div>
  )
}

export default CartModel
