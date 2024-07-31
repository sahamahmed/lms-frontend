'use client'
import Link from 'next/link'
import React, { useState } from 'react'

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    activeItem: number
}

const Header = (props: Props) => {
    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)

    if(typeof window !== 'undefined'){
        window.addEventListener('scroll', () => {
            if(window.scrollY > 80){
                setActive(true)
            }else{
                setActive(false)
            }
        })
    }
return (
    <div className='w-full relative'>
        <div
            className={`${
                active
                    ? "bg-no-repeat bg-blue-700 dark:bg-opacity-45 dark:bg-red-950 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#167c52]"
                    : "bg-no-repeat bg-green-700  w-full h-[80px] z-[80] border-b dark:border-[#127463] dark:shadow"
            }`}>
            <div className='w-[95%] md:w-[92%] m-auto py-2 h-full'>
                <div className='flex justify-between items-center h-full'>
                    <div className='flex items-center'>
                        <Link href='#' className='text-white mr-4'>
                            Elearning
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <Link href='#' className='text-white mx-4'>
                            Link 1
                        </Link>
                        <Link href='#' className='text-white mx-4'>
                            Link 2
                        </Link>
                        <Link href='#' className='text-white mx-4'>
                            Link 3
                        </Link>
                    </div>
                    <div className='flex items-center'>
                        <Link href='#' className='text-white ml-4'>
                            Link 4
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
}

export default Header

