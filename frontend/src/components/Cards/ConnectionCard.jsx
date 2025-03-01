import React from 'react'
import Avatar from '../Avatar/Avatar'
import CoverImage from '../CoverImage/CoverImage'
import Button from '../Button/Button'
import { IoMdAdd } from "react-icons/io";

const ConnectionCard = () => {
    return (
        <div className='w-full max-w-full rounded-md bg-white overflow-hidden select-none border border-slate-200 min-w-[250px]'>
            <div className='relative h-[120px]'>
                <div className='h-[70px] bg-green-100'>
                    <CoverImage />
                </div>
                <div className='absolute top-0 left-[50%] -translate-x-1/2  translate-y-1/2'>
                    <div className='size-[70px] flex-none'>
                        <Avatar />
                    </div>
                </div>
            </div>
            <div className='text-center flex flex-col items-center gap-2 p-4'>
                <h3 className='text-lg'>Test User</h3>
                <p className='text-[13px] tracking-wide'>Software Developer</p>
                <div className='w-2/3'>
                    <Button
                        varient={'contained'}
                        color={'slate-800'}
                    >
                        <div className='flex-center gap-2'>
                        <IoMdAdd/>
                        Connect
                        </div>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ConnectionCard