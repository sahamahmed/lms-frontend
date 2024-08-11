import React from 'react'

type Props = {
    videoUrl: string
    title: string
}

const CoursePlayer = ({videoUrl, title}: Props) => {

  return (
    <div>
      <video src={videoUrl} controls className='h-96 w-full'></video>
    </div>
  )
  
}

export default CoursePlayer