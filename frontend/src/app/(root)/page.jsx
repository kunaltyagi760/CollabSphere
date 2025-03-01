'use client'
import Avatar from '@/components/Avatar/Avatar'
import Card from '@/components/Cards/Card'
import PostCard from '@/components/Cards/PostCard'
import PostPopup from '@/components/Popups/PostPopup'
import React, { useState } from 'react'

const page = () => {
    const [openPopup, setOpenPopup] = useState(false);
    const handleClosePopup = () => setOpenPopup(false);
    const handleOpenPopup = () => setOpenPopup(true);
    return (
        <>
            <div className='w-full'>
                <div className='mb-4'>
                    <Card>
                        <div className='p-4'>
                            <div className='flex gap-4'>
                                <div className='h-[50px] w-[50px] flex-none'>
                                    <Avatar />
                                </div>
                                <div
                                    className='w-full rounded-full h-[50px] border border-slate-400 flex items-center px-4 text-slate-700 hover:bg-gray-100 cursor-pointer'
                                    onClick={handleOpenPopup}
                                >
                                    Start a post
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
                <PostCard />
                <PostCard />
            </div>
            <PostPopup open={openPopup} onClose={handleClosePopup} />
        </>

    )
}

export default page
