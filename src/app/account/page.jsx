"use client"

import InputComponents from '@/components/FormElements/InputComponents';
import ComponentLevelLoader from '@/components/Loader/componentLevel';
import { GlobalContext } from '@/context/Index'
import { addNewAddress, deleteAddress, fetchAllAddresses, updateAddress } from '@/services/address';
import { addNewAddressFormControls } from '@/utils';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { PulseLoader } from 'react-spinners';

const Account = () => {

    const { user, addressFormData, setAddressFormData, addresses, setAddresses, componentLevelLoader, setComponentLevelLoader, pageLevelLoader, setPageLevelLoader } = useContext(GlobalContext);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [currentEditedAddressId, setCurrentEditedAddressId] = useState(null);
    const router = useRouter();

    const extractAllAddresses = async () => {
        setPageLevelLoader(true);
        const res = await fetchAllAddresses(user?._id);
        if (res.success) {
            setPageLevelLoader(false);
            setAddresses(res.data);
        }
    }

    useEffect(() => {
        if (user !== null) extractAllAddresses();
    }, [user]);

    const handleAddOrUpdateAddress = async () => {
        setComponentLevelLoader({ loading: true, id: "" })
        const res = currentEditedAddressId !== null ? await updateAddress({ ...addressFormData, _id: currentEditedAddressId }) :
            await addNewAddress({ ...addressFormData, userID: user?._id });
        console.log(res);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" })
            toast.success(res.message, { position: "top-center" });
            setAddressFormData({
                fullName: "",
                address: "",
                city: "",
                country: "",
                postalCode: "",
            })
            extractAllAddresses();
            setCurrentEditedAddressId(null);
        } else {
            setComponentLevelLoader({ loading: false, id: "" });
            toast.error(res.message, { position: "top-center" });
            setAddressFormData({
                fullName: "",
                address: "",
                city: "",
                country: "",
                postalCode: "",
            })
        }
    }

    const handleUpdateAddress = async (getCurrentAddress) => {
        setShowAddressForm(true);
        setAddressFormData({
            fullName: getCurrentAddress.fullName,
            address: getCurrentAddress.address,
            city: getCurrentAddress.city,
            country: getCurrentAddress.country,
            postalCode: getCurrentAddress.postalCode,
        })
        setCurrentEditedAddressId(getCurrentAddress._id)
    }

    const handleDelete = async (getCurrentID) => {
        setComponentLevelLoader({ loading: true, id: getCurrentID })

        const res = await deleteAddress(getCurrentID);
        if (res.success) {
            setComponentLevelLoader({ loading: false, id: "" })
            toast.success(res.message, { position: "top-center" });
            extractAllAddresses();
        } else {
            setComponentLevelLoader({ loading: false, id: "" })
            toast.error(res.message, { position: "top-center" });
        }
    }

    return (
        <section>
            <div className='mx-auto bg-gray-100 px-4 sm:px-6 lg:px-8'>
                <div className='bg-white shadow'>
                    <div className='p-6 sm:p-12'>
                        <div className='flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row'>
                            {/* render random user img for logo */}
                        </div>
                        <div className='flex flex-col flex-1 gap-2'>
                            <h4 className='text-lg font-semibold capitalize text-center md:text-left'>Name : {user?.name}</h4>
                            <p className='text-lg font-semibold'>Email : {user?.email}</p>
                            <p className='text-lg font-semibold capitalize '>Role : {user?.role}</p>
                        </div>
                        <button onClick={() => router.push('/orders')} className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>View Your Order</button>
                        <div className='mt-6'>
                            <h1 className='font-bold text-lg'>Your Address</h1>
                            {
                                pageLevelLoader ? 
                                <PulseLoader
                                    color={"#000000"}
                                    loading={pageLevelLoader}
                                    size={15}
                                    data-testid="loader"
                                /> :
                                    <div className='mt-4 flex flex-col gap-3'>
                                        {
                                            addresses && addresses.length ?
                                                addresses.map(item => (
                                                    <div className='border p-6' key={item._id}>
                                                        <p>Name : {item.fullName}</p>
                                                        <p>Address : {item.address}</p>
                                                        <p>City : {item.city}</p>
                                                        <p>Country : {item.country}</p>
                                                        <p>PostalCode : {item.postalCode}</p>
                                                        <button onClick={() => handleUpdateAddress(item)} className='mt-4 mr-5 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>Update</button>
                                                        <button onClick={() => handleDelete(item._id)} className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>
                                                            {
                                                                componentLevelLoader && componentLevelLoader.loading && componentLevelLoader.id === item._id ?
                                                                    <ComponentLevelLoader text={"Deleting"} color={"#ffffff"} loading={componentLevelLoader && componentLevelLoader.loading} />
                                                                    : "Delete"
                                                            }
                                                        </button>
                                                    </div>
                                                ))
                                                : <p>No address found! Please add a new address below</p>
                                        }
                                    </div>
                            }
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
                                    <button onClick={handleAddOrUpdateAddress} className='mt-4 group inline-flex items-center justify-between bg-black px-4 py-2 text-lg text-white font-medium uppercase tracking-wide'>
                                        {
                                            componentLevelLoader && componentLevelLoader.loading ?
                                                <ComponentLevelLoader text={"Saving Address"} color={"#ffffff"} loading={componentLevelLoader && componentLevelLoader.loading} />
                                                : "Save"
                                        }
                                    </button>
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
