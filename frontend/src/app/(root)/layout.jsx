import Avatar from '@/components/Avatar/Avatar'
import Card from '@/components/Cards/Card'
import UserCard from '@/components/Cards/UserCard'
import CoverImage from '@/components/CoverImage/CoverImage'
import Navbar from '@/components/Navbar/Navbar'
import Link from 'next/link'
import React from 'react'

const layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className=' w-full md:w-4/5 lg:w-3/4 max-w-full m-auto px-4 pt-4'>
                <div className='flex flex-col sm:flex-row item-center justify-between gap-4 '>

                    <div>
                        <div className='flex flex-col gap-4 md:sticky top-[76px] '>
                            <Card>
                                <div className='h-[70px] bg-green-100'>
                                    <CoverImage />
                                </div>
                                <div className=' h-[40px] relative px-4'>
                                    <div className='absolute top-[-60%]'>
                                        <div className='h-[50px] w-[50px] flex-none'>
                                            <Avatar />
                                        </div>
                                    </div>
                                </div>
                                <div className='px-4 pb-4'>
                                    <div>
                                        <h2 className='text-lg font-semibold '>Dummy User</h2>
                                        <p className='text-[13px] tracking-wide'>Software Developer</p>
                                        <p className='text-[13px] tracking-wide text-slate-500'>Location</p>
                                    </div>
                                </div>
                            </Card>
                            <div className='hidden sm:block'>
                                <Card>
                                    <div className='p-4 flex flex-col gap-4'>
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-lg font-semibold'>Connections</h3>
                                            <p className='text-[13px] tracking-wide text-slate-500'>500</p>
                                        </div>

                                        <div className='flex flex-col gap-2'>
                                            <div className='flex items-center justify-between'>
                                                <p>Recent</p>
                                                <p className='text-blue-500 text-[12px]'><Link href='/'>View All</Link></p>
                                            </div>
                                            <UserCard />
                                            <UserCard />
                                            <UserCard />
                                            <UserCard />
                                            <UserCard />
                                        </div>

                                    </div>
                                </Card>
                            </div>
                        </div>
                    </div>
                    {children}

                </div>
            </div>
        </div>
    )
}

export default layout