import React from 'react'
import CourseCard from './CourseCard'

const PopularCourses = () => {
  return (
    <div className='space-y-16'>
      <h1 className='text-5xl text-[#4A1F64] font-normal text-center'>Popular Courses</h1>

      <div className='grid grid-cols-3 gap-6'>
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  )
}

export default PopularCourses