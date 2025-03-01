import React from 'react'

const Card = ({ children }) => {
    return (
        <div
            className='w-full rounded-md bg-white overflow-hidden select-none border border-slate-200 min-w-[250px]'
        >
            {children}
        </div>
    )
}

export default Card