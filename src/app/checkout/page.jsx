"use client"

import { GlobalContext } from '@/context/Index'
import { fetchAllAddresses } from '@/services/address';
import { createNewOrder } from '@/services/order';
import { callStripeSession } from '@/services/stripe';
import { loadStripe } from '@stripe/stripe-js';
import { object } from 'joi';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

const Checkout = () => {

    const { cartItems, user, addresses, setAddresses, checkoutFormData, setCheckoutFormData } = useContext(GlobalContext);
    console.log("Cart: ", cartItems);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [isOrderProcessing, setIsOrderProcessing] = useState(false);
    const [orderSuccess, setOrderSuccess] = useState(false);
    const router = useRouter();
    const params = useSearchParams();

    const publishableKey = 'pk_test_51Oa9uuSJeryR5AfLkX4yUcaNpNBn1AkVYcQokdcAseKVva3lODi76LrDCHyUsNHiie6cYJwvYWgUawZKSE5eppX500bJxNWpGj';
    const stripePromise = loadStripe(publishableKey);

    const getAllAddresses = async () => {
        const res = await fetchAllAddresses(user?._id);
        if (res.success) {
            setAddresses(res.data);
        }
    }

    useEffect(() => {
        if (user !== null) getAllAddresses()
    }, [user]);

    useEffect(() => {
        async function createFinalOrder() {

            const isStripe = JSON.parse(localStorage.getItem('stripe'));

            if (isStripe && params.get('status') === "success" && cartItems && cartItems.length > 0) {
                setIsOrderProcessing(true);
                const getCheckoutFormData = JSON.parse(localStorage.getItem('checkoutFormData'));

                const createFinalCheckoutFormData = {
                    user: user?._id,
                    shippingAddress: getCheckoutFormData.shippingAddress,
                    orderItems: cartItems.map(item => ({
                        qty: 1,
                        product: item.productID,
                    })),
                    paymentMethod: 'Stripe',
                    totalPrice: cartItems.reduce((total, item) => item.productID.price + total, 0),
                    isPaid: true,
                    isProcessing: true,
                    paidAt: new Date(),
                }

                const res = await createNewOrder(createFinalCheckoutFormData);
                if (res.success) {
                    setIsOrderProcessing(false);
                    setOrderSuccess(true);
                    toast.success(res.message, { position: "top-center" });
                } else {
                    setIsOrderProcessing(false);
                    setOrderSuccess(false);
                    toast.error(res.message, { position: "top-center" });
                }
            }
        }

        createFinalOrder();

    }, [params.get('status'), cartItems]);

    const handleSelectedAddress = async (getAddress) => {

        if (getAddress._id === selectedAddress) {
            setSelectedAddress(null);
            setCheckoutFormData({
                ...checkoutFormData, shippingAddress: {}
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

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        const createLineItems = cartItems.map(item => ({
            price_data: {
                currency: 'usd',
                product_data: {
                    images: [item.productID.imageUrl],
                    name: item.productID.name
                },
                unit_amount: item.productID.price * 100
            },
            quantity: 1
        }))

        const res = await callStripeSession(createLineItems);
        setIsOrderProcessing(true);
        localStorage.setItem("stripe", true);
        localStorage.setItem("checkoutFormData", JSON.stringify(checkoutFormData));

        const { error } = await stripe.redirectToCheckout({
            sessionId: res.id,
        })
        console.log("Payment Error :", error);
    }

    console.log(checkoutFormData);

    useEffect(() => {
        if(orderSuccess) {
            setTimeout(() => {
                // setOrderSuccess(false);
                router.push('/orders');
            }, [2000])
        }
    }, [orderSuccess]);

    if (orderSuccess) {
        return <section className='h-screen bg-gray-200'>
            <div className='flex flex-col justify-center items-center text-xl font-bold m-20'>
                <h1>
                    Yours Payment is Successful You will redirect to Orders page in 3 sec.
                </h1>
            </div>
        </section>
    }

    if (isOrderProcessing) {
        return <div className='w-full h-screen flex justify-center items-center'>
            <PulseLoader
                color={"#000000"}
                loading={isOrderProcessing}
                size={30}
                data-testid="loader"
            />
        </div>
    }

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
                                    <div onClick={() => handleSelectedAddress(item)} key={item._id} className={`border p-6 cursor-pointer ${item._id === selectedAddress ? "border-green-400" : null}`}>
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
                            <button onClick={handleCheckout} disabled={(cartItems && cartItems.length === 0) || Object.keys(checkoutFormData.shippingAddress).length === 0} className='mt-4 disabled:opacity-50 w-full mr-5 flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase'>
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
