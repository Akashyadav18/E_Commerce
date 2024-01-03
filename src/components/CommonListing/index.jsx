'use client'

import React, { useEffect } from 'react'
import ProductTile from './ProductTile'
import ProductButton from './ProductButtons'
import { useRouter } from 'next/navigation'

const CommonListing = ({data}) => {

    const router = useRouter();
    useEffect(() => {
        router.refresh();
    }, [])

    return (
        <section className='bg-white py-6'>
            <div className='px-4 sm:px-6 lg:px-10'>
                <div className='mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                    { data && data.length ?
                        data.map((item) => (
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
