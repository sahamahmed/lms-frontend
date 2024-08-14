'use client'
import CourseDetails from '@/components/CourseDetails'
import React from 'react'

const page = ({params}:any) => {
    const {id} = params
  return (
    <CourseDetails id={id} />
  )
}

export default page