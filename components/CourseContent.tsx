import { useGetCourseContentQuery } from '@/redux/features/courses/courseApi'
import React from 'react'
import CourseContentMedia from './CourseContentMedia'
import CourseContentList from './CourseContentList'
import { useSelector } from 'react-redux'

type Props = {
    id: string
}

const CourseContent = ({id}: Props) => {
    const {data, isLoading} = useGetCourseContentQuery(id)
    const [activeVideo, setActiveVideo] = React.useState<number>(0);
    const user = useSelector((state: any) => state.auth.user)
    // console.log(data)
    // console.log(data?.content[0]?.courseData)
    if (isLoading) {
        return <div>Loading...</div> // You can replace this with a spinner or a loading indicator
    }

    if (!data || !data.content || !data.content[0] || !data.content[0].courseData) {
        return <div>No course data available.</div> // Handle case where data is not available
    }

    return (
        <div className='w-full md:grid grid-cols-10 space-y-4'>
            <div className="col-span-7">
                <CourseContentMedia
                    data={data.content[0].courseData}
                    id={id}
                    activeVideo={activeVideo}
                    setActiveVideo={setActiveVideo}
                    user={user}
                />
            </div>

            <div className="col-span-3 w-full ml-12">
                <CourseContentList activeVideo={activeVideo}  setActiveVideo={setActiveVideo} data={data.content[0].courseData} />
            </div>
        </div>
    )
}

export default CourseContent