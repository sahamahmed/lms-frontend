import React from 'react'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { IoMdVideocam } from "react-icons/io";

type Props = {
    data: any,
    activeVideo?: number
    setActiveVideo?: any
    isDemo?: boolean
}

const CourseContentList = ({data, isDemo, activeVideo, setActiveVideo}: Props) => {
    const [visibleSection, setVisibleSection] = React.useState<Set<string>>(new Set<string>())

    //find unique video sections
    const videoSections: string[] = Array.from(new Set<string>(data?.map((item: any) => item.videoSection)));

    let totalCount: number = 0

    const toggleSection = (section: string) => {
        const newVsibleSections = new Set(visibleSection)
        if (newVsibleSections.has(section)) {
            newVsibleSections.delete(section)
        } else {
            newVsibleSections.add(section)
        }

        setVisibleSection(newVsibleSections)
    }

  return (
    <div className={` w-full text-slate-800 dark:text-white ${!isDemo ? 'ml-[-30px] w-full min-h-screen  top-24 left-0 z-30': '' }`}>
        {videoSections.map((section: string, index: number) => {
            const isSectionVisible = visibleSection.has(section)
            const sectionVides : any[] = data.filter((item: any) => item.videoSection === section)
            const sectionVidCount = sectionVides.length
            const sectionVidLength= sectionVides.reduce((acc, item) => acc + item.videoLength, 0)
            const sectionStartIndex = totalCount
            totalCount += sectionVidCount
            const sectionVidHours = sectionVidLength / 60
            return(
                <div key={section} className={`${!isDemo && 'border-b border-white pb-2 '}`}>
                    <div className='w-full flex justify-between items-center'>
                        <h1>{section}</h1>
                        <button className='mr-4 cursor-pointer' onClick={()=> {toggleSection(section)}}>
                            {
                                isSectionVisible ? (
                                    <BsChevronUp size={20} />
                                ) : (
                                    <BsChevronDown size={20} />
                                )
                            }
                        </button>
                    </div>

                    <h1>{sectionVidCount} Lessons</h1>
                    {/* <h1>{sectionVidLength < 60 ? sectionVidLength : sectionVidHours.toFixed(1)}  </h1>
                    <h1>{sectionVidLength > 60 ? "hours": "mins"}</h1> */}
                    <br />

                    {
                        isSectionVisible && (
                            <div className="w-full border-y p-3">
                                {sectionVides.map((video: any, index: number) => {
                                    return (
                                        <div key={video.id} className={`flex flex-col justify-between items-start ${activeVideo === sectionStartIndex + index ? 'text-blue-500' : ''}`}>
                                            <div className='flex justify-start items-center gap-4' onClick={() => setActiveVideo(index)}>
                                                <IoMdVideocam size={20} />
                                                <h1>{(video.title).toString()}</h1>
                                            </div>
                                            <h1>{video.duration || '10'} minutes</h1>

                                        </div>
                                    )
                                })}
                            </div>
                        )
                    }

                </div>
            )
        } )}

    </div>
  )
}

export default CourseContentList