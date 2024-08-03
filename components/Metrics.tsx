import React from 'react'
import { PiUsersThreeDuotone } from "react-icons/pi";
import { IoStarOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";


const Metrics = () => {
  return (
    <div className='space-y-16'>
      <h1 className='text-5xl text-[#4A1F64] font-normal text-center'>User Metrics & Engagement Statistics</h1>
      <div className='flex justify-between font-[poppins]'>
        <div className='flex flex-col justify-center items-center gap-1'>
          <PiUsersThreeDuotone className=' text-[#4A1F64]' size={40} />
          <h1 className='text-4xl text-[#4A1F64] font-normal'>10.2 K</h1>
          <h1 className='text-xl text-[#4A1F64] font-normal'>Total Enrollments</h1>
        </div>
        <div className='w-[0.5px] bg-[#4A1F64] h-12 my-auto'></div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <IoStarOutline className=' text-[#4A1F64]' size={40} />
          <h1 className='text-4xl text-[#4A1F64] font-normal'>4.9/5</h1>
          <h1 className='text-xl text-[#4A1F64] font-normal'>{`Learners' Satisfaction`}</h1>
        </div>
        <div className='w-[0.5px] bg-[#4A1F64] h-12 my-auto'></div>
        <div className='flex flex-col justify-center items-center gap-1'>
          <BsGlobe2 className=' text-[#4A1F64]' size={40} />
          <h1 className='text-4xl text-[#4A1F64] font-normal'>5K+</h1>
          <h1 className='text-xl text-[#4A1F64] font-normal'>Daily Users</h1>
        </div> 
      </div>
    </div>
  )
}

export default Metrics