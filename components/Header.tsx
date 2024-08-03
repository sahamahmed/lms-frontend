'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import ThemeSwitcher from '../utils/theme-switcher'
import Navbar from './Navbar'
import Image from 'next/image'



const Header = () => {
    
    return (
        <div className='space-y-8 min-h-full h-auto'>
           
            <Navbar />
            <div className='grid grid-cols-12'>
                <div className=' col-span-8 z-10'>
                    <div className='flex flex-col justify-center gap-2 h-full'>
                        <h1 className='text-6xl font-semibold font-[josefin] text-[#4A1F64]'>Revolutionarize Education with <span className='text-[#A176BB]'>Personalized</span> Learning Paths</h1>
                        <p className='text-lg text-[#5B2C78]'>Study any topic, anytime. Choose from a number of expert-led courses now.</p>
                        <div className='my-8'>
                            <Link href={'/courses'} className='text-[#ebe8ec] bg-gradient-to-l from-[#4A1F64] to-[#b792e7] py-2 px-6 rounded-full font-normal mt-8 border border-purple-800 shadow-md shadow-black'>Start Learning</Link>

                        </div>
                    </div>
                </div>
                <Image src={"/computer.png"} alt="hero" width={500} height={600} className="col-span-4 z-10 h-full" />
            </div>
        </div>
    );
}

export default Header