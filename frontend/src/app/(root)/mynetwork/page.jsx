import Card from '@/components/Cards/Card'
import ConnectionCard from '@/components/Cards/ConnectionCard'
import Input from '@/components/Input/Input'
import React from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

const page = () => {
	return (
		<div className='w-full'>
			<Card>
				<div className='p-4 flex flex-col gap-4'>
					<div className='flex justify-between items-center'>
						<div>
							<h3 className='text-lg'>Find Connections</h3>
							<p className='text-[13px] tracking-wide text-slate-500'>Find using same interest</p>
						</div>
						<div>
							<Input placeholder='Search' startIcon={<AiOutlineSearch className='mr-2' />} />
						</div>
					</div>
					

					<div className='flex gap-2'>
						<div className='cursor-pointer p-2 hover:bg-blue-50 rounded-md'>
							<h3 className=' text-blue-500'>Software Developer</h3>
						</div>
						<div className='cursor-pointer p-2 hover:bg-blue-50 rounded-md'>
							<h3 className='text-blue-500'>Software Tester</h3>
						</div>
						<div className='cursor-pointer p-2 hover:bg-blue-50 rounded-md'>
							<h3 className='text-blue-500'>Ui Designer</h3>
						</div>
						<div className='cursor-pointer p-2 hover:bg-blue-50 rounded-md'>
							<h3 className='text-blue-500'>Graphic Designer</h3>
						</div>
						<div className='cursor-pointer p-2 hover:bg-blue-50 rounded-md'>
							<h3 className='text-blue-500'>Frontend Developer</h3>
						</div>
					</div>
					<div className='border-b border-slate-400' />
					
					<div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
						<ConnectionCard />
						<ConnectionCard />
						<ConnectionCard />
						<ConnectionCard />
						<ConnectionCard />
						<ConnectionCard />
					</div>

				</div>
			</Card>
		</div>
	)
}

export default page