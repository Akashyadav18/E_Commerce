"use client"

import { GlobalContext } from '@/context/Index'
import { fetchAllAddresses } from '@/services/address';
import { object } from 'joi';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'

const Checkout = () => {

    const { cartItems, user, addresses, setAddresses, checkoutFormData, setCheckoutFormData} = useContext(GlobalContext);
    console.log("Cart: ", cartItems);
    const router = useRouter();
    const [selectedAddress, setSelectedAddress] = useState(null);

    const getAllAddresses = async () => {
        const res = await fetchAllAddresses(user?._id);
        if (res.success) {
            setAddresses(res.data);
        }
    }

    useEffect(() => {
        if (user !== null) getAllAddresses()
    }, [user]);

    const handleSelectedAddress = async (getAddress) => {

        if(getAddress._id === selectedAddress) {
            setSelectedAddress(null);
            setCheckoutFormData({...checkoutFormData, shippingAddress: {}
            });
            return;
        } 

        setSelectedAddress(getAddress._id);
        setCheckoutFormData({
            ...checkoutFormData,
            shippingAddress: {
                ...checkoutFormData.shippingAddress,
                fullName: getAddress.fullName,
                address: getAddress.address,
                city: getAddress.city,
                country: getAddress.country,
                postalCode: getAddress.postalCode,

            }
        })
    }

    console.log(checkoutFormData);

    return (
        <div>
            <div className='grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32'>
                <div className='px-4 pt-8'>
                    <p className='font-medium text-xl'>Cart Summary</p>
                    <div className='mt-8 space-y-3 rounded-lg border bg-white px-2 sm:px-5'>
                        {
                            cartItems && cartItems.length ?
                                cartItems.map(item => <div key={item._id} className='flex flex-col rounded-lg bg-white sm:flex-row'>
                                    <img src={item && item.productID && item.productID.imageUrl} alt="cart item" className='m-2 h-24 w-28 rounded-md border object-cover object-center' />
                                    <div className='flex w-full flex-col px-4 py-4'>
                                        <span className='font-bold'>{item && item.productID && item.productID.name}</span>
                                        <span className='font-semibold'>$ {item && item.productID && item.productID.price}</span>
                                    </div>
                                </div>
                                )
                                :
                                <div>Your Cart is Empty!</div>
                        }
                    </div>
                </div>
                <div className='mt-10 bg-gray-50 px-4 pt-8 lg:mt-0'>
                    <p className='text-xl font-medium'>Shipping address details</p>
                    <p className='text-gray-400 font-bold'>Complete Your Order by Selecting address below</p>
                    <div className='w-full mt-6 space-y-6'>
                        {
                            addresses && addresses.length ?
                                addresses.map((item) => (
                                    <div onClick={()=> handleSelectedAddress(item)} key={item._id} className={`border p-6 cursor-pointer ${item._id === selectedAddress ? "border-green-400" : null}`}>
                                        <p>Name : {item.fullName}</p>
                                        <p>Address : {item.address}</p>
                                        <p>City : {item.city}</p>
                                        <p>Country : {item.country}</p>
                                        <p>PostalCode : {item.postalCode}</p>
                                        <button className={`mt-4 mr-5 group inline-flex items-center justify-between px-4 py-2 text-lg text-white font-medium uppercase tracking-wide ${item._id === selectedAddress ? "bg-green-800" : "bg-black"}`}>
                                            {item._id === selectedAddress ? "Selected Address" : "Select Address"}
                                        </button>
                                    </div>
                                ))
                                : <p>No Address Added</p>
                        }
                    </div>
                    <button onClick={() => router.push("/account")} className='mt-4 mr-5 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>
                        Add New Address
                    </button>
                    <div className='mt-6 border-t border-b py-2'>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-medium text-gray-900'>SubTotal</p>
                            <p className='text-lg font-bold text-gray-900'>$ {cartItems && cartItems.length ?
                                cartItems.reduce((total, item) => item.productID.price + total, 0)
                                : "0"}
                            </p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-lg font-bold text-gray-900'>Shipping</p>
                            <p className='text-lg font-bold text-gray-900'>Free</p>
                        </div>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm font-medium text-gray-900'>Total</p>
                            <p className='text-lg font-bold text-gray-900'>$ {cartItems && cartItems.length ?
                                cartItems.reduce((total, item) => item.productID.price + total, 0)
                                : "0"}
                            </p>
                        </div>
                        <div className='pb-10'>
                            <button disabled={(cartItems && cartItems.length ===0) || Object.keys(checkoutFormData.shippingAddress).length === 0} className='mt-4 disabled:opacity-50 w-full mr-5 flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase'>
                                CheckOut
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
