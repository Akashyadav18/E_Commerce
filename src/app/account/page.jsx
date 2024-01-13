"use client"

import InputComponents from '@/components/FormElements/InputComponents';
import { GlobalContext } from '@/context/Index'
import { addNewAddressFormControls } from '@/utils';
import React, { useContext, useState } from 'react'

const Account = () => {

    const { user, addressFormData, setAddressFormData, addresses, setAddresses } = useContext(GlobalContext);
    const [showAddressForm, setShowAddressForm] = useState(false);

    return (
        <section>
            <div className='mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8'>
                <div className='bg-white shadow'>
                    <div className='p-6 sm:p-12'>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
                            {/* render random user img */}
                        </div>
                        <div className='flex flex-col flex-1 gap-2'>
                            <h4 className='text-lg font-semibold capitalize text-center md:text-left'>Name : {user?.name}</h4>
                            <p className='text-lg font-semibold'>Email : {user?.email}</p>
                            <p className='text-lg font-semibold capitalize '>Role : {user?.role}</p>
                        </div>
                        <button className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>View Your Order</button>
                        <div className='mt-6'>
                            <h1 className='font-bold text-lg'>Your Address</h1>
                            <div className='mt-4'>
                                {
                                    addresses && addresses.length ?
                                        addresses.map(item => (
                                            <div className='border p-6' key={item._id}>
                                                <p>Name : {item.fullName}</p>
                                                <p>Address : {item.address}</p>
                                                <p>City : {item.city}</p>
                                                <p>Country : {item.country}</p>
                                                <p>PostalCode : {item.postalCost}</p>
                                                <button className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>Update</button>
                                                <button className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>Delete</button>
                                            </div>
                                        ))
                                        : <p>No address found! Please add a new address below</p>
                                }
                            </div>
                        </div>
                        <div className='mt-4'>
                            <button onClick={() => setShowAddressForm(!showAddressForm)} className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>
                                {showAddressForm ? "Hide Address Form" : "Add New Address"}
                            </button>
                        </div>
                        {
                            showAddressForm ?
                                <div className='flex flex-col justify-center items-center'>
                                    <div className='w-full mt-6 space-y-4'>
                                        {
                                            addNewAddressFormControls.map((controlItem) => (
                                                <InputComponents type={controlItem.type} placeholder={controlItem.placeholder} label={controlItem.label}
                                                    value={addressFormData[controlItem.id]} onChange={(e) => setAddressFormData({ ...addressFormData, [controlItem.id]: e.target.value })}
                                                />
                                            ))
                                        }
                                    </div>
                                    <button className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>Save</button>
                                </div>
                                : null
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Account
