import React from 'react'
import Avatar from '../Avatar/Avatar'
import { AiOutlineLike, AiFillLike, AiOutlineComment } from "react-icons/ai";

const PostCard = () => {
    return (
        <div className='w-full rounded-md bg-white p-4 flex flex-col gap-2 border-slate-200 my-2'>
            <div className='flex items-center gap-4 '>
                <div className='size-[40px]'>
                    <Avatar />
                </div>
                <div>
                    <h4>User Name</h4>
                    <p className='text-[13px] tracking-wide text-slate-500'>Software Developer</p>
                </div>
                <div className='ml-auto cursor-pointer p-2 hover:bg-blue-50 rounded-md'>
                    <h3 className='text-blue-500'>+ Follow</h3>
                </div>
            </div>

            <div>
                Content
            </div>
            <div className='text-center'>
                <img
                    src={'https://images.pexels.com/photos/30913847/pexels-photo-30913847/free-photo-of-indoor-artistic-scene-with-calligraphy-and-cat.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load'}
                    className='rounded-md max-w-full align-middle max-h-[400px] w-full'
                />
            </div>
            <div className='flex gap-4 justify-end'>
            <p className='text-[13px] tracking-wide text-slate-500'>{100} Likes</p>
            <p className='text-[13px] tracking-wide text-slate-500'>{50} Comments</p>
            </div>
            <div className='border-b border-slate-400' />
            <div className='flex gap-2'>

                <div className='flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-2 rounded-md'>
                    <AiOutlineLike />
                    <p>Like</p>
                </div>

                <div className='flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-2 rounded-md'>
                    <AiOutlineComment />
                    <p>Comment</p>
                </div>
            </div>
        </div>
    )
}

export default PostCard