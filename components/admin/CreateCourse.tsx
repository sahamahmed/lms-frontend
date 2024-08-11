'use client'
import React, { useEffect } from 'react'
import CourseOptions from './CourseOptions'
import CourseInformation from './CourseInformation'
import AdminSideBar from '../AdminSideBar'
import CourseData from './CourseData'
import CourseContent from './CourseContent'
import { set } from 'zod'
import CoursePreview from './CoursePreview'
import { useCreateCourseMutation } from '@/redux/features/courses/courseApi'
import { toast } from 'sonner'
import { root } from 'postcss'
import { useRouter } from 'next/navigation'

type Props = {}

const CreateCourse = (props: Props) => {
    const [createCourse, {isSuccess, error, isLoading, data}] = useCreateCourseMutation()
    const router = useRouter()
    const [courseData, setCourseData] = React.useState({})
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

    useEffect(() => {
        if(isSuccess) {
            toast.success('Course Created Successfully')
            router.push('/admin/courses')
        }

        if (error) {
            if ("data" in error) {
                const errorMessage = error as any
                toast.error(errorMessage.data.message)
            }
        }
    }, [isSuccess, error, isLoading])


    const handleSubmit = () => {
        const formattedBenefits = benefits.map((benefit) => ({title : benefit.title}))
        const formattedPrerequisites = prerequisites.map((prerequisite) => ({title : prerequisite.title}))
        const formattedCourseContentData = courseContentData.map((section) => ({
            title: section.title,
            description: section.description,
            videoUrl: section.videoUrl,
            videoSection: section.videoSection,
            links: section.links.map((link) => ({title: link.title, url: link.url})),
            suggestions: section.suggestions
        }))


        //preparing data object 
        const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            thumbnail: courseInfo.thumbnail,
            totalVideos : courseContentData.length,
            benefits: formattedBenefits,
            prerequisites: formattedPrerequisites,
            courseData: formattedCourseContentData
        }

        setCourseData(data)
    }


    const handleCourseCreate = async (e: any) => {
        const data = courseData

        if (!isLoading) {
            await createCourse(data)  
        }
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

              {
                  active === 3 && (
                      <CoursePreview
                          active={active}
                          setActive={setActive}
                        courseData={courseData}
                          handleCourseCreate={handleCourseCreate}
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