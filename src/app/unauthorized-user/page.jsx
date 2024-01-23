"use client"

import React from 'react'

const Unauthorized = () => {
    return (
        <section className='h-screen bg-gray-200'>
            <div className='flex flex-col justify-center items-center text-xl font-bold m-20'>
                <h1>
                    You don't have access to view this page!
                </h1>
            </div>
        </section>
    )
}

export default Unauthorized
