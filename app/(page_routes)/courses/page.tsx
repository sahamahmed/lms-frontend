'use client'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

const Page = () => {
  return (
    <div className="px-28 py-5">
      <div>
        <Image src="/Ellipse.png" alt="hero" width={500} height={500} className="fixed right-0 top-0 h-[450px]" />
        <Image src="/Rectangle.png" alt="hero" width={500} height={500} className="fixed left-0 h-[80%] top-0  w-[7%] " />
      </div>
      <Navbar />
    </div>
  )
}

export default Page