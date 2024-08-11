import React from 'react'
import CoursePlayer from '../CoursePlayer'

type Props = {
    active: number,
    setActive: (active: number) => void
    courseData: any
    handleCourseCreate: any
}

const CoursePreview = ({
    active, setActive, courseData, handleCourseCreate
}: Props) => {
    console.log(courseData)
  return (
      <div className=' w-[80%] ml-8 mt-24 mb-6 dark:text-white text-slate-900 '>
        <div className='w-full relative'>
            <div className='w-full my-10'>
                <CoursePlayer videoUrl={courseData?.demoUrl} title={courseData?.title}  />
            </div>
              <div>
                  {/* Price and Discount Section */}
                  <div className='flex items-center justify-between'>
                      <div className='text-3xl font-bold'>{courseData.price|| '100'} <span className='line-through text-gray-500 text-lg'>{courseData.estimatedPrice || '100'}</span> <span className='text-green-500'>0% Off</span></div>
                      <button className='bg-red-500 text-white py-2 px-6 rounded-full'>Buy Now {courseData.price}</button>
                  </div>


                  {/* Course Features */}
                  <ul className='mt-4 text-gray-600 space-y-1'>
                      <li>Source code included</li>
                      <li>Full lifetime access</li>
                      <li>Certificate of completion</li>
                      <li>Premium Support</li>
                  </ul>

                  {/* Course Title and Details */}
                  <div className='mt-6'>
                      <h1 className='text-2xl font-bold'>{courseData.name || 'title'}</h1>
                      <div className='flex items-center justify-between space-x-2'>
                          <div>
                              <span className='text-yellow-500 text-lg mr-4'>☆☆☆☆☆</span>
                              <span>0 Reviews</span>
                          </div>
                            <div>
                                <span>0 Students</span>
                            </div>
                      </div>
                  </div>

                  {/* What you'll learn Section */}
                  <div className='mt-6'>
                      <h2 className='text-xl font-semibold'>What you will learn from this course?</h2>
                      <ul className='mt-2 space-y-1'>
                          {courseData && courseData.benefits && courseData?.benefits.map((item: any, index: number) => (
                              <li key={index} className='flex items-center space-x-2'>
                                  <span>✔️</span>
                                  <span>{item?.title || 'abc'}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Prerequisites Section */}
                  <div className='mt-6'>
                      <h2 className='text-xl font-semibold'>What are the prerequisites for starting this course?</h2>
                      <ul className='mt-2 space-y-1'>
                          {courseData && courseData.prerequisites &&  courseData?.prerequisites.map((item: any, index: number) => (
                              <li key={index} className='flex items-center space-x-2'>
                                  <span>✔️</span>
                                  <span>{item.title || 'abc'}</span>
                              </li>
                          ))}
                      </ul>
                  </div>

                  {/* Course Details Section */}
                  <div className='mt-6'>
                      <h2 className='text-xl font-semibold'>Course Details</h2>
                      <p className='mt-2'>{courseData.description}</p>
                  </div>
              </div>


              <div className='mt-8 flex justify-between'>
                  <button
                      onClick={() => setActive(active - 1)}
                      className='bg-[#4A1F64] w-[25%] text-white px-4 py-2 rounded-md'
                  >
                      Back
                  </button>

                  <button
                      onClick={() => {
                            handleCourseCreate()
                        }
                        }
                      className='bg-[#4A1F64] w-[25%] text-white px-4 py-2 rounded-md'
                  >
                      Create
                  </button>
              </div>
        </div>
    </div>
  )
}

export default CoursePreview