import React from 'react'
import CourseCard from './CourseCard'
import { useGetMyCoursesQuery } from '@/redux/features/courses/courseApi'
import Loader from './Loader'

type Props = {
    user: any
}

const EnrolledCourses = ({user}: Props) => {
  const { data, isLoading } = useGetMyCoursesQuery({})
  console.log(data)
  return (
    <div className='w-full text-slate-900 dark:text-white space-y-8 font-semibold'>
      {
        isLoading ? (
          <div className=' h-screen'>
            <Loader />
          </div>
        ) : (
         <>
              <h1 className='text-center text-2xl text-[#4A1F64] dark:text-[#c7aae2]'>{`Currently enrolled in ${data?.courses?.length} Courses`}</h1>
              <div className="grid grid-cols-3 gap-3">
                {data && data?.courses?.map((course: any) => (
                  <div key={course._id}>
                    <CourseCard course={course} isMine={true} />
                  </div>
                ))}
              </div>
         </>
        )
      }
    </div>
  )
}

export default EnrolledCourses