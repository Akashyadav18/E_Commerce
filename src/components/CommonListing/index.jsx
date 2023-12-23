'use client'

import React from 'react'
import ProductTile from './ProductTile'
import ProductButton from './ProductButtons'

const dummyData = [
    {

        _id: "6584f9017c9f2f5047fd3d2b",
        name: "Women cloth",
        description: "Women's clothes are articles of clothing designed for and worn by wome…",
        price: 246,
        category: "women",
        sizes: [
            {
                id: 's',
                label: 'S',
                id: 'm',
                label: 'M',
                id: 'l',
                label: 'L',
            }
        ],
        deliveryInfo: "Free",
        onSale: "yes",
        priceDrop: 18,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/next-js-ecommerce-1b7e4.appspot.com/o/ecommerce%2Fwomen2.jpeg-1703213201737-ttvbvl0tfy?alt=media&token=98be5d9b-4e50-495d-9ffd-6e4344644ef4",
    }
]

const CommonListing = () => {
    return (
        <section className='bg-white py-6'>
            <div className='px-4 sm:px-6 lg:px-10'>
                <div className='mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
                    { dummyData && dummyData.length ?
                        dummyData.map((item) => (
                            <article key={item._id} className='relative flex flex-col overflow-hidden border shadow cursor-pointer p-2'>
                                <ProductTile item={item}/>
                                <div className='flex gap-3 mt-2'>
                                <ProductButton item={item} />
                                </div>
                            </article>
                        ))
                        : null 
                    }
                </div>
            </div>
        </section>
    )
}

export default CommonListing
