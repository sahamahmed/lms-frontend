import React from 'react'

type Props = {
    videoUrl: string
    title: string
    classname?: string
}

const CoursePlayer = ({videoUrl, title, classname}: Props) => {

  return (
      <video src={videoUrl} controls className={`${classname}`}></video>
  )
  
}

export default CoursePlayer