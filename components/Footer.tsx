import React from 'react'

const Footer = () => {
  return (
    <div className='grid grid-cols-12 space-x-4 justify-items-start'>

      <div className='col-span-4'>
        <h1 className='text-lg text-[#4A1F64] font-bold'>Company</h1>
        <ul className='space-y-1 text-[#533168]'>
          <li>About Us</li>
          <li>Press</li>
          <li>FAQ</li>
        </ul>
      </div>
      
      <div className='col-span-4'>
        <h1 className='text-lg text-[#4A1F64] font-bold'>Quick Links</h1>
        <ul className='space-y-1 text-[#533168]'>
          <li>Courses</li>
          <li>My Account</li>
          <li>Dashboard</li>
        </ul>
      </div>

      <div className='col-span-4'>
        <h1 className='text-lg text-[#4A1F64] font-bold'>Social Links</h1>
        <ul className='space-y-1 text-[#533168]'>
          <li>Facebook</li>
          <li>Linkedin</li>
          <li>Github</li>
        </ul>
      </div>

   
    </div>
  )
}

export default Footer