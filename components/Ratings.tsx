import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';



type Props = {
    data: any
    size?: number
}

const Ratings = ({data, size}: Props) => {
  return (

    <span className='text-yellow-500 flex'>
        {[1, 2, 3, 4, 5].map((item, index) => {
            if (data?.ratings >= item) {
                // Full star
                return (
                    <AiFillStar
                        size={size ? size : 24}
                        key={index}
                        className='cursor-pointer text-yellow-500'
                    />
                );
            } else if (data?.course?.ratings >= item - 0.5) {
                // Half star
                return (
                    <div key={index} className='relative'>
                        <AiFillStar
                            size={size ? size : 24}
                            className='cursor-pointer text-yellow-500'
                            style={{ position: 'absolute', clipPath: 'inset(0 50% 0 0)' }} // Half star fill
                        />
                        <AiOutlineStar
                            size={size ? size : 24}
                            className='cursor-pointer text-yellow-500'
                        />
                    </div>
                );
            } else {
                // Empty star
                return (
                    <AiOutlineStar
                        size={size ? size : 24}
                        key={index}
                        className='cursor-pointer text-yellow-500'
                    />
                );
            }
        })}
    </span>


  )
}

export default Ratings