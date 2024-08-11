import React from 'react'
import {IoMdCheckmark} from 'react-icons/io'

type Props = {
    active: number,
    setActive: (active: number) => void
}

const CourseOptions = ({active, setActive}: Props) => {
    const options = [
        "Course Information",
        "Course Options",
        "Course Content",
        "Course Preview"
    ]
  return (
    <div className='py-12'>
        {options.map((option, index) => (
            <div
                key={index}
                className={`w-full flex py-5 text-slate-900 dark:text-white `}
            >
                <div className={`flex items-center justify-center rounded-full h-[35px] w-[35px] ${active + 1 > index ? "bg-blue-500" : "bg-[#384766]"} relative`}>
                    <IoMdCheckmark className='text-white' />
                    {
                        index !== options.length -1  && (
                            <div className={`absolute bottom-[-100%] h-[30px] w-1 ${active +1 > index ? "bg-blue-500" : "bg-[#384776]"}`} />
                        )
                    }
                </div>
                <h5 className={`pl-3 text-[20px] ${
                    active === index ? "font-bold":""}`}>{option}
                    </h5>

            </div>
        )
        )
}
    </div>
  )
}

export default CourseOptions