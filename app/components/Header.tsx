'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import ThemeSwitcher from '../utils/theme-switcher'

type Props = {
    open: boolean
    setOpen: (open: boolean) => void
    activeItem: number

}

const navItems = [
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Courses',
        link: '/courses'
    },
    {
        name: 'About',
        link: '/about'
    },
]

const Header = (props: Props) => {
    const { open, setOpen, activeItem } = props
    const [active, setActive] = useState(false)
    const [openSidebar, setOpenSidebar] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    if (typeof window !== 'undefined') {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                setActive(true)
            } else {
                setActive(false)
            }
        })
    }
    return (
        <div className='w-full relative'>
            <div
                className={`${active
                        ? "bg-no-repeat bg-blue-700 dark:bg-opacity-45 dark:bg-red-950 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#167c52]"
                        : "bg-no-repeat bg-green-300 dark:bg-green-900  w-full h-[80px] z-[80] border-b dark:border-[#127463] dark:shadow"
                    }`}>
                <div className='w-[95%] md:w-[92%] m-auto py-2 h-full'>
                    <div className='flex justify-between items-center h-full'>
                        <div className='flex items-center'>
                            <Link href='#' className='text-white mr-4'>
                                Elearning
                            </Link>
                        </div>
                        <div className='hidden md:flex items-center gap-4 '>
                            {navItems.map((item, index) => (
                                <Link href={item.link} key={index} >
                                    <span className={`${activeItem == index ? "text-red-500 dark:text-blue-300" : "text-white dark:text-green-500"}`}>
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                            <ThemeSwitcher />

                        </div>

                        {
                            isMobile && (
                                <div className='flex md:hidden items-center gap-4 '>
                                    {navItems.map((item, index) => (
                                        <Link href={item.link} key={index} >
                                            <span className={`${activeItem == index ? "text-yellow-500 dark:text-blue-300" : "text-white dark:text-green-500"}`}>
                                                {item.name}
                                            </span>
                                        </Link>
                                    ))}
                                    <ThemeSwitcher />
                                </div>
                            )
                        }
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

