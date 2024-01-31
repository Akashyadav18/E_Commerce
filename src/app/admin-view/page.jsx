"use client"

import ComponentLevelLoader from '@/components/Loader/componentLevel';
import { GlobalContext } from '@/context/Index'
import { getAllOrdersForAllUsers, updateStatusOfOrder } from '@/services/order';
import React, { useContext, useEffect } from 'react'
import { PulseLoader } from 'react-spinners';

const AdminView = () => {

  const { allOrdersForAllUsers, setAllOrdersForAllUsers, user, componentLevelLoader, setComponentLevelLoader, pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);

  async function extractAllOrdersForAllUsers() {
    setPageLevelLoader(true);
    const res = await getAllOrdersForAllUsers();
    if (res.success) {
      setPageLevelLoader(false);
      setAllOrdersForAllUsers(res.data && res.data.length ? res.data.filter(item => item.user._id !== user._id) : []);
    } else {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAllUsers();
  }, [user]);

  async function handleUpdateOrderStatus(getItem) {
    setComponentLevelLoader({ loading: true, id: getItem._id });
    const res = await updateStatusOfOrder({
      ...getItem,
      isProcessing: false,
    })
    if (res.success) {
      setComponentLevelLoader({ loading: false, id: "" });
      extractAllOrdersForAllUsers();
    } else {
      setComponentLevelLoader({ loading: false, id: "" });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color={"#000000"}
          loading={pageLevelLoader}
          size={30}
          data-testid="loader"
        />
      </div>
    )
  }

  console.log(allOrdersForAllUsers);

  return (
    <section>
      <div className="px-4 py-6 sm:px-8 sm:py-10">
        <div className="flow-root">
          {
            allOrdersForAllUsers && allOrdersForAllUsers.length ?
              <ul className="flex flex-col gap-4">
                {
                  allOrdersForAllUsers.map(item =>
                    <li key={item._id} className="flex flex-col gap-3 bg-gray-100 shadow p-5 space-y-3 py-6 text-left">
                      <div className="flex">
                        <h1 className="font-bold text-lg mb-3 flex-1">#Order: {item._id}</h1>
                        <div className='flex flex-col gap-3'>
                          <div className="flex item-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">User Name :</p>
                            <p className="text-sm font-semibold text-gray-900">{item.user?.name}</p>
                          </div>
                          <div className="flex items-start">
                            <p className="mr-3 text-sm font-medium text-gray-900">User Email :</p>
                            <p className="text-sm font-semibold text-gray-900">{item.user?.email}</p>
                          </div>
                          <div className="flex items-start">
                            <p className="mr-3 text-sm font-medium text-gray-900">Total Paid Amount :</p>
                            <p className="text-sm font-semibold text-gray-900">$ {item?.totalPrice}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {
                          item.orderItems.map((orderItem, index) =>
                            <div key={index} className="shrink-0">
                              <img src={orderItem && orderItem.product && orderItem.product.imageUrl} alt="orderItem" className="h-24 w-24 max-w-full rounded-lg object-cover" />
                            </div>
                          )
                        }
                      </div>
                      <div className="flex gap-5">
                        <button className='mt-4 disabled:opacity-50 mr-5 flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase'>
                          {item.isProcessing ? "Order is Processing" : "Order is delivered"}
                        </button>
                        <button onClick={() => handleUpdateOrderStatus(item)} className='mt-4 mr-5 flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase'>
                          {
                            componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === item._id ?
                              <ComponentLevelLoader text={"Updating order Status"} color={"#ffffff"} loading={componentLevelLoader && componentLevelLoader.loading} />
                              : "Update Order Status"
                          }
                        </button>
                      </div>
                    </li>
                  )
                }
              </ul>
              : null
          }
        </div>
      </div>
    </section>
  )
}

export default AdminView
