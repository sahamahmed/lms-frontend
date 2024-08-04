'use client'
import React from 'react'
import CourseOptions from './CourseOptions'
import CourseInformation from './CourseInformation'
import AdminSideBar from './AdminSideBar'
import CourseData from './admin/CourseData'
import CourseContent from './admin/CourseContent'

type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = React.useState(0)
    const [courseInfo, setCourseInfo] = React.useState({
        name: '',
        description: '',
        price: '',
        estimatedPrice: '',
        tags: '',
        level: '',
        demoUrl: '',
        thumbnail: ''
    })
    const [benefits, setBenefits] = React.useState([{ title: ''}])
    const [prerequisites, setPrerequisites] = React.useState([{ title: ''}])
    const [courseContentData, setCourseContentData] = React.useState([{ 
        title: '',
        description: '',
        videoUrl: '',
        videoSection: 'Untitled Section',
        links: [{ title: '', url: ''}],
        suggestions: ''

    }])


    const handleSubmit = () => {
        console.log(courseInfo)
        console.log(benefits)
        console.log(prerequisites)
        console.log(courseContentData)
    }

  return (
    <div className='w-full flex min-h-screen'>
        <div className='w-[80%]'>
            {
                active === 0 && (
                    <CourseInformation 
                        courseInfo={courseInfo}
                        setCourseInfo={setCourseInfo}
                        setActive={setActive}
                        active={active}
                    />
                )
            }

            {
                active === 1 && (
                    <CourseData
                        setActive={setActive}
                        active={active}
                        benefits={benefits}
                        setBenefits={setBenefits}
                        prerequisites={prerequisites}
                        setPrerequisites={setPrerequisites}
            
                    />
                )
            }

              {
                  active === 2 && (
                      <CourseContent
                          active={active}
                          setActive={setActive}
                          courseContentData={courseContentData}
                          setCourseContentData={setCourseContentData}
                          handleSubmit={handleSubmit}
                      />
                  )
              }
        </div>

        <div className='w-[20%] mt-[100px] h-screen fixed z-[-1] top-18 right-3 '>
            <CourseOptions active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default CreateCourse