'use client'
import EditCourse from '@/components/admin/EditCourse'
import { useGetFullCourseQuery } from '@/redux/features/courses/courseApi'
import React, { useEffect } from 'react'


const Page = ({params}: {params: any}) => {
    const { id } = params
    const { isSuccess, data} = useGetFullCourseQuery({id});
    console.log(data)
    
    return (

       <>
            {data && data.course ? (
                <div>
                    <EditCourse course={data?.course} />
                </div>) : null}
       </>
    )


}

export default Page