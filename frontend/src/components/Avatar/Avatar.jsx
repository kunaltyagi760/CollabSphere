import React from 'react'

const Avatar = ({onClick}) => {
  return (
    <div className='w-full h-full rounded-full border-2 border-white overflow-hidden flex-center cursor-pointer' onClick={onClick}>
        <div className='bg-blue-400 h-full w-full text-white flex-center'>
            DU
        </div>
    </div>
  )
}

export default Avatar