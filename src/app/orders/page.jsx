"use client"

import { GlobalContext } from "@/context/Index"
import { getAllOrdersForUser } from "@/services/order";
import { useContext, useEffect } from "react"
import toast from "react-hot-toast";
import { PulseLoader } from "react-spinners";
import { useRouter } from 'next/navigation';

export default function Orders() {

    const { user, pageLevelLoader, setPageLevelLoader, allOrdersForUser, setAllOrdersForUser } = useContext(GlobalContext);
    const router = useRouter();

    async function extractAllOrders() {
        setPageLevelLoader(true);
        const res = await getAllOrdersForUser(user?._id);
        if (res.success) {
            setPageLevelLoader(false);
            setAllOrdersForUser(res.data);
            toast.success(res.message, { position: "top-center" });
        } else {
            setPageLevelLoader(false);
            toast.success(res.message, { position: "top-center" });
        }
    }

    useEffect(() => {
        if (user !== null) extractAllOrders();
    }, [user]);

    console.log(allOrdersForUser);

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

    return (
        <section className=" bg-gray-200">
            <div className="mx-auto sm:px-6 lg:px-8">
                <div className="mt-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-8 sm:py-10">
                        <div className="flow-root">
                            {
                                allOrdersForUser && allOrdersForUser.length ?
                                    <ul className="flex flex-col gap-4">
                                        {
                                            allOrdersForUser.map(item =>
                                                <li key={item._id} className="flex flex-col bg-white shadow p-5 space-y-3 py-6 text-left">
                                                    <div className="flex">
                                                        <h1 className="font-bold text-lg mb-3 flex-1">#Order: {item._id}</h1>
                                                        <div className="flex item-center">
                                                            <p className="mr-3 text-sm font-medium text-gray-900">Total Paid amount</p>
                                                            <p className="mr-3 text-2xl font-semibold text-gray-900">${item.totalPrice}</p>
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
                                                        <button className='mt-4 disabled:opacity-50 w-full mr-5 flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase'>
                                                            {item.isProcessing ? "Order is Processing" : "Order is delivered"}
                                                        </button>
                                                        <button onClick={() => router.push(`/orders/${item._id}`)} className='mt-4 w-full mr-5 flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase'>
                                                            View Order Details
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
                </div>
            </div>
        </section>
    )
}