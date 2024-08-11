import React, { useState } from 'react'

type Props = {
    courseInfo: any
    setCourseInfo: any
    active: number
    setActive: any
}

const CourseInformation = ({courseInfo, setActive, setCourseInfo, active}: Props) => {

    const [dragging, setDragging] = useState(false)

    const handleSubmission = (e: any) => {
        e.preventDefault()
        setActive(active + 1)
    }

    const handleFileChange = (e: any) => {
        const file = e.target.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setCourseInfo({
                    ...courseInfo,
                    thumbnail: reader.result
                })
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDragOver = (e: any) => {
        e.preventDefault()
        setDragging(true)
    }
   
    const handleDragLeave = (e: any) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e: any) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) {
            const reader = new FileReader()
            reader.onload = () => {
                setCourseInfo({
                    ...courseInfo,
                    thumbnail: reader.result
                })
            }
            reader.readAsDataURL(file)
        }
        setDragging(false)
    }


  return (

    <div className='w-[80%] ml-8 mt-24 mb-6'>
        <div>
            <h1 className='text-3xl font-bold'>Course Information</h1>
              <form onSubmit={handleSubmission} className='mt-8 w-[85%] '>
                <div className='flex flex-col gap-4 '>
                    <label htmlFor='name' className='text-lg'>Course Name</label>
                    <input 
                        type='text' 
                        id='name' 
                        placeholder='Enter course name' 
                        value={courseInfo.name}
                        onChange={(e) => setCourseInfo({...courseInfo, name: e.target.value})}
                        className='border border-gray-300 rounded-md p-2'
                    />
                </div>
                <div className='flex flex-col gap-4 mt-4'>
                    <label htmlFor='description' className='text-lg'>Course Description</label>
                    <textarea 
                        id='description' 
                        placeholder='Enter course description' 
                        value={courseInfo.description}
                        onChange={(e) => setCourseInfo({...courseInfo, description: e.target.value})}
                        className='border border-gray-300 rounded-md p-2'
                    />
                </div>
                <div className='flex justify-between'>
                      <div className='flex flex-col gap-4 mt-4'>
                          <label htmlFor='price' className='text-lg'>Course Price </label>
                          <input
                              type='text'
                              id='price'
                              value={courseInfo.price}
                              onChange={(e) => setCourseInfo({ ...courseInfo, price: e.target.value })}
                              className='border border-gray-300 rounded-md p-2'
                          />
                      </div>
                      <div className='flex flex-col gap-4 mt-4'>
                          <label htmlFor='estimatedPrice' className='text-lg'>Estimated Price(Optional)</label>
                          <input
                              type='text'
                              id='estimatedPrice'
                              value={courseInfo.estimatedPrice}
                              onChange={(e) => setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })}
                              className='border border-gray-300 rounded-md p-2'
                          />
                      </div>
                </div>
                <div className='flex justify-between'>
                      <div className='flex flex-col gap-4 mt-4'>
                          <label htmlFor='tags' className='text-lg'>Course Tags</label>
                          <input
                              type='text'
                              id='tags'
                              placeholder='Enter course tags'
                              value={courseInfo.tags}
                              onChange={(e) => setCourseInfo({ ...courseInfo, tags: e.target.value })}
                              className='border border-gray-300 rounded-md p-2'
                          />
                      </div>
                      <div className='flex flex-col gap-4 mt-4'>
                          <label htmlFor='level' className='text-lg'>Course Level</label>
                          <input
                              type='text'
                              id='level'
                              placeholder='Enter course level'
                              value={courseInfo.level}
                              onChange={(e) => setCourseInfo({ ...courseInfo, level: e.target.value })}
                              className='border border-gray-300 rounded-md p-2'
                          />
                      </div>
                </div>
                <div className='flex flex-col gap-4 mt-4'>
                    <label htmlFor='demoUrl' className='text-lg'>Course Demo URL</label>
                    <input 
                        type='text' 
                        id='demoUrl' 
                        placeholder='Enter course demo URL' 
                        value={courseInfo.demoUrl}
                        onChange={(e) => setCourseInfo({...courseInfo, demoUrl: e.target.value})}
                        className='border border-gray-300 rounded-md p-2'
                    />
                </div>


                  <div className='flex flex-col gap-4 mt-4'>
                      <div
                          onDragOver={handleDragOver}
                          onDragLeave={handleDragLeave}
                          onDrop={handleDrop}
                          className={`relative `}
                      >
                          <label
                              htmlFor='thumbnail'
                              className={`absolute inset-0 flex items-center justify-center text-lg py-4 text-slate-600 cursor-pointer border border-gray-300 rounded-md p-2 w-full ${dragging ? ' bg-gray-300' : ''}`}
                          >
                              Drag & Drop thumbnail here
                          </label>

                          <input
                              type='file'
                              id='thumbnail'
                              placeholder='Enter course thumbnail'
                              onChange={handleFileChange}
                              className='hidden'
                          />
                          
                      </div>
                      {
                          courseInfo.thumbnail && (
                              <img src={courseInfo.thumbnail.url || courseInfo.thumbnail } alt='thumbnail' className='mt-12' />
                          )
                      }
                  </ div>



                <div className='mt-16 flex justify-end'>
                    <button 
                        type='submit' 
                          className='bg-[#4A1F64] w-[25%] text-white px-4 py-2 rounded-md'
                    >
                        Next
                    </button>
                </div>


              </form>
        </div>
    </div>
  )
}

export default CourseInformation