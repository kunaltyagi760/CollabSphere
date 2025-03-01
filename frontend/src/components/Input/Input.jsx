import React from 'react'

const Input = ({ label, startIcon, endIcon,error, ...props }) => {
	return (
		<div className='w-full'>
			<label>{label}</label>
			<div className='h-[40px] px-4  w-full border rounded flex items-center focus-within:outline-1 focus-within:outline-slate-900 '>
				{startIcon}
				<input className='h-full w-full outline-0' {...props} />
				{endIcon}
			</div>
			{error && <p className='text-[12px] text-red-500'>{error}</p>}
		</div>
	)
}

export default Input