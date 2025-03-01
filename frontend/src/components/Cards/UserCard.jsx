import React from 'react'
import Avatar from '../Avatar/Avatar'

const UserCard = () => {
    return (
        <div className='w-full flex items-center gap-2 border border-slate-400 p-2 rounded-md'>
            <div className='h-[40px] w-[40px]'>
                <Avatar />
            </div>

            <div>
                <h3>Test User</h3>
                <p className='text-[13px] tracking-wide'>Software Developer</p>
            </div>
        </div>
    )
}

export default UserCard