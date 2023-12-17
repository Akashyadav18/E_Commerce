import React from 'react'

const TileComponent = ({ data, selected = [], onClick }) => {
    return data && data.length ? (
        <div className='flex flex-wrap items-center gap-3 mt-3'>
            {data.map((dataItem) => (
                <label className='cursor-pointer' key={dataItem.id}>
                    <span className='rounded-md border border-black px-6 py-2 font-bold'>
                        {dataItem.label}
                    </span>
                </label>
            ))}
        </div>
    ) : null;
}

export default TileComponent
