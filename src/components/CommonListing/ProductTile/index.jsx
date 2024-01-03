import { useRouter } from 'next/navigation'
import React from 'react'

const ProductTile = ({ item }) => {
    const router = useRouter();
    return (
        <div onClick={() => router.push(`/product/${item._id}`)} className=''>
            <div className='overflow-hidden aspect-w-1 aspect-h-1 h-52'>
                <img src={item.imageUrl} alt='productImg' className='w-full h-full object-cover transition-all duration-300 group-hover:scale-125' />
            </div>
            {item.onSale === 'yes' ? (
                <div className='absolute top-0 m-2 bg-teal-400 px-2 py-[3px] rounded-full'>
                    <p className='text-white'>Sale</p>
                </div>
            ) : null}
            <div className='flex flex-col justify-center items-center mt-2 gap-1'>
                <h3 className='text-xl font-semibold'>Name: {item.name}</h3>
                <div className='flex gap-3'>
                    <h4 className={`text-lg font-medium ${item.onSale === 'yes' ? 'line-through' : ''}`}>${item.price}</h4>
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
                <p className='text-lg font-medium'>Category: {item.category}</p>
                <div className='flex gap-5'>
                    <p className={`${item.deliveryInfo == "paid" ? "bg-red-400" : "bg-lime-500"} text-white px-3 py-1 rounded `}>{item.deliveryInfo}</p>

                </div>
            </div>
        </div>
    )
}

export default ProductTile
