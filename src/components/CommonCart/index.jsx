"use client"

import React, { useContext } from 'react'
import ComponentLevelLoader from '../Loader/componentLevel'
import { useRouter } from 'next/navigation';
import { GlobalContext } from '@/context/Index';

const CommonCart = ({ cartItems = [], handleDeleteCartItem, componentLevelLoader }) => {

  const router = useRouter();

  return (
    <section className='h-screen bg-gray-100'>
      <div className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto mt-8 max-w-screen-xl px-4 sm:px-6 lg:px-8'>
          <div className='bg-white shadow'>
            <div className='px-4 py-6 sm:px-8 sm:py-10'>
              <div className='flow-root'>
                {cartItems && cartItems.length ?
                  <ul>
                    {
                      cartItems.map((cartItem) => (
                        <li key={cartItem.id} className='flex-col flex space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0'>
                          <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                            <img src={cartItem && cartItem.productID && cartItem.productID.imageUrl} alt={cartItem.id} className='h-full w-full object-cover object-center' />
                          </div>
                          <div className="flex flex-1 flx-col justify-between">
                            <div className='sm:col-gap-5 sm:grid sm:grid-cols-2'>
                              <div className='pr-2 sm:pr-4'>
                                <p className='text-base font-semibold text-gray-900'>{cartItem && cartItem.productID && cartItem.productID.name}</p>
                              </div>
                              <div className='mt-4 flex gap-3 items-end justify-between sm:mt-0 sm:items-start sm:justify-end'>
                                <p className='shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-1 sm:ml-8 sm:text-right'>${cartItem && cartItem.productID && cartItem.productID.price}</p>
                                <button onClick={() => handleDeleteCartItem(cartItem._id)} type='button' className='font-medium text-red-700 sm:order-2'>
                                  {
                                    componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === cartItem._id ?
                                      <ComponentLevelLoader text={"Removing"} color={"#000000"} loading={componentLevelLoader && componentLevelLoader.loading} /> : "Remove"
                                  }
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                  :
                  <h1 className='font-bold text-lg text-center'>Cart is Empty!</h1>
                }
              </div>

              <div className='mt-6 border-t border-b py-2'>
                <div className='flex items-center justify-between'>
                  <p className=' text-gray-400'>SubTotal</p>
                  <p className='text-lg text-black font-semibold'>
                    ${cartItems && cartItems.length ?
                      cartItems.reduce((total, item) => item.productID.price + total, 0)
                      : "0"}
                  </p>
                </div>

                <div className='flex items-center justify-between'>
                  <p className='text-sm text-gray-400'>Shipping</p>
                  <p className='text-lg text-black font-semibold'>
                    $ 0
                  </p>
                </div>

                <div className='flex items-center justify-between'>
                  <p className=' text-gray-800'>Total</p>
                  <p className='text-lg text-black font-semibold'>
                    ${cartItems && cartItems.length ?
                      cartItems.reduce((total, item) => item.productID.price + total, 0)
                      : "0"}
                  </p>
                </div>
                <div className='mt-5 text-center'>
                  <button onClick={() => router.push('/checkout')} disabled={cartItems && cartItems.length === 0} className='group disabled:opacity-50 inline-flex w-full items-center justify-between bg-black px-6 py-3 text-lg text-white font-medium uppercase tracking-wide'>
                    {
                      componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === cartItem._id ?
                        <ComponentLevelLoader text={"Checkout"} color={"#000000"} loading={componentLevelLoader && componentLevelLoader.loading} /> : "CheckOut"
                    }
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CommonCart
