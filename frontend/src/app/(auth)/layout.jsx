import React from 'react'

const Layout = ({ children }) => {
    return (
        <div className='w-full h-[100dvh] flex-center p-2'>
            <div className='w-[500px] max-w-full bg-white rounded-md'>
                {
                    children
                }
            </div>
        </div>
    )
}

export default Layout