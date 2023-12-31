import React from 'react'

const TileComponent = ({ data, selected = [], onClick }) => {
    return data && data.length ? (
        <div className='flex flex-wrap items-center gap-3 mt-3'>
            {data.map((dataItem) => (
                <label onClick={() => onClick(dataItem)} className={`cursor-pointer
                ${selected && selected.length && selected.map(item => item.id).indexOf(dataItem.id) !== -1 ? "bg-black" : "" }`} key={dataItem.id}>
                    <span className={`rounded-md border border-black px-6 py-2 font-bold
                ${selected && selected.length && selected.map(item => item.id).indexOf(dataItem.id) !== -1 ? "text-white" : "" }`}>
                        {dataItem.label}
                    </span>
                </label>
            ))}
        </div>
    ) : null;
}

export default TileComponent
