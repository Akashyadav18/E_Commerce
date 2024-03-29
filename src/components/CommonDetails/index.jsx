'use client'
import { GlobalContext } from '@/context/Index';
import { addToCart } from '@/services/cart';
import React, { useContext } from 'react'
import toast from 'react-hot-toast';
import ComponentLevelLoader from '../Loader/componentLevel';

const CommonDetails = ({ item }) => {

  const {setComponentLevelLoader, componentLevelLoader, user, setShowCartModal} = useContext(GlobalContext);

  const handleAddToCart = async (getItem) => {
    setComponentLevelLoader({ loading: true, id: "" });

    const res = await addToCart({ productID: getItem._id, userID: user._id });
    console.log("Add to cart :", res);
    if (res.success) {
      toast.success(res.message, { position: "top-center" });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    } else {
      toast.error(res.message, { position: "top-center" });
      setComponentLevelLoader({ loading: false, id: "" });
      setShowCartModal(true);
    }
  }

  return (
    <section className='mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto px-4'>
        <div className='lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16'>
          <div className='lg:col-span-3 lg:row-end-1'>
            <div className='lg:flex lg:items-start'>
              <div className='lg:order-2 lg:ml-5'>
                <div className='max-w-xl overflow-hidden rounded-lg'>
                  <img src={item.imageUrl} alt="product Details" className='h-full w-full max-w-full object-cover' />
                </div>
              </div>
              <div className='mt-2 w-full lg:w-32 lg:order-1 lg:flex-shrink-0'>
                <div className='flex flex-row items-start lg:flex-col'>
                  <button type='button' className='flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center'>
                    <img src={item.imageUrl} alt="product Details" className='h-full w-full object-cover' />
                  </button>
                  <button type='button' className='flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center'>
                    <img src={item.imageUrl} alt="product Details" className='h-full w-full object-cover' />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='lg:col-span-2 lg:row-span-2 lg:row-end-2'>
            <h1 className='text-2xl font-bold text-gray-900 '>{item && item.name}</h1>
            <div className='mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0'>
              <div className='flex items-end gap-4'>
              
              <h4 className={`text-lg font-medium ${item.onSale === 'yes' ? 'line-through' : ''}`}>${item && item.price}</h4>
                    {
                        item.onSale === 'yes' ?
                            <h4 className='text-lg font-medium text-red-700'>${(item.price - item.price * (item.priceDrop / 100)).toFixed(2)}</h4>
                            : null
                    }
                    {
                        item.onSale === 'yes' ?
                            <p className="px-2 py-1 bg-neutral-400 text-white rounded">-{item.priceDrop}% off</p>
                            : null
                    }
              </div>
              <button type='button' onClick={() => handleAddToCart(item)} className='mt-1.5 inline-block bg-black px-5 py-3 text-xs font-medium tracking-wide uppercase text-white'>
              {
                componentLevelLoader && componentLevelLoader.loading ?
                <ComponentLevelLoader text={"Adding To Cart"} color={"#ffffff"} loading={componentLevelLoader && componentLevelLoader.loading}/>
                 : "Add To Cart"
              }
              </button>
            </div>
            <ul className="mt-8 space-y-2">
              <li className='flex items-center text-left text-sm font-medium text-gray-600'>{item && item.deliveryInfo}</li>
              <li className='flex items-center text-left text-sm font-medium text-gray-600'>Cancel AnyTime</li>
            </ul>
            <div className='lg:col-span-3'>
              <div className='border-b border-gray-400'>
                <nav className=' flex gap-4'>
                  <a href='#' className='border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900'>Description</a>
                </nav>
              </div>
              <div className='mt-8 flow-root sm:mt-12'>{item && item.description}</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default CommonDetails
