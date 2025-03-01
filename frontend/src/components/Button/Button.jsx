import React from 'react'

const Button = ({ children, varient, color, ...props }) => {
	switch (varient) {
		case 'contained':
			return (
				<div className='h-[40px]'>
					<button
						{...props}
						className={`h-full w-full cursor-pointer active:scale-[0.98] transition-all border rounded-md bg-${color} text-white hover:bg-slate-900`}
					>
						{children}
					</button>
				</div>
			)
		case 'outlined':
			return (
				<div className='h-[40px]'>
					<button
						{...props}
						className={`h-full w-full cursor-pointer active:scale-[0.98] transition-all border rounded-md border-${color} text-${color} hover:bg-slate-100`}
					>
						{children}
					</button>
				</div>
			)
		default:
			return (
				<div className='h-[40px]'>
					<button
						{...props}
						className={`h-full w-full cursor-pointer active:scale-[0.98] transition-all border rounded-md ${color} text-white`}
					>
						{children}
					</button>
				</div>
			)
	}

}

export default Button