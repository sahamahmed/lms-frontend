import Image from 'next/image'
import React from 'react'

const FeedbackCards = () => {
  return (
    <div className='relative bg-blue-400 h-64 w-[30%] px-10 pt-16 rounded-3xl'>
        <div className='absolute top-[-60px] left-[-15px] flex justify-between items-center h-32 w-full '>          
              <div className='bg-[#4A1F64] h-16 px-4 py-2 rounded-[30px]'>Student Name</div>
                <div className='h-28 w-28 bg-black rounded-full'></div>
        </div>

       <div className='flex flex-row gap-2 justify-start items-center'>
              <div className='w-1 bg-[#4A1F64] h-24 my-auto rounded-sm'></div>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus inventore deleniti est, non vel asperiores. Nam est aliquid dolorum porro.</p>
       </div>

    </div>
  )
}

export default FeedbackCards