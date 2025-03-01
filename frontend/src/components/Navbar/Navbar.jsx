'use client'
import React from 'react'
import Avatar from '../Avatar/Avatar'
import Input from '../Input/Input'
import { AiOutlineSearch, AiFillHome } from "react-icons/ai";
import { MdSupervisorAccount, MdMessage } from "react-icons/md";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname()
    return (
        <header className='h-[60px] flex-center bg-white sticky top-0 z-10'>
            <nav className='h-full w-full md:w-4/5 lg:w-3/4 max-w-full px-4 flex items-center justify-between'>
                <div className='flex-center gap-4'>
                    <div className='flex-center h-[40px] w-[40px] bg-blue-400 rounded-md text-white'>
                        <Link href={'/'}>
                            DU
                        </Link>
                    </div>
                    <div>
                        <Input placeholder='Search' startIcon={<AiOutlineSearch className='mr-2' />} />
                    </div>
                </div>
                <div className='ml-auto mr-8 h-full'>
                    <ul className='flex gap-4 items-center h-full'>
                        <NavLinks icon={<AiFillHome size={20} />} title='Home' link={'/'} />
                        <NavLinks icon={<MdSupervisorAccount size={20} />} title='Networks' link={'/mynetwork'} />
                        <NavLinks icon={<MdMessage size={20} />} title='Messages' link={'/messages'} />
                        <div className='w-[1px] h-2/4 bg-slate-200' />
                    </ul>
                </div>

                <div className='h-[40px] w-[40px] flex-none'>
                    <Avatar />
                </div>
            </nav>
        </header>
    )
}

const NavLinks = ({ icon, title, link }) => {
    const pathname = usePathname();  

    const isActive = pathname === link;

    return (
        <li className='h-full'>
            <Link href={link} className={`h-full px-2 flex-center  flex-col ${isActive ? 'border-b-2 border-blue-500' : 'border-b-2 border-transparent'}`}>
                {icon}
                <p className='text-[12px]'>{title}</p>
            </Link>
        </li>
    )
}

export default Navbar;
