import React from 'react';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { IoMdVideocam } from 'react-icons/io';
import { MdOutlineLock } from 'react-icons/md';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  data: any;
  activeVideo?: number;
  setActiveVideo?: any;
  isDemo?: boolean;
};

const CourseContentList = ({ data, isDemo, activeVideo, setActiveVideo }: Props) => {
  const [visibleSection, setVisibleSection] = React.useState<Set<string>>(new Set<string>());

  // Find unique video sections
  const videoSections: string[] = Array.from(new Set<string>(data?.map((item: any) => item.videoSection)));

  let totalCount: number = 0;

  const toggleSection = (section: string) => {
    const newVisibleSections = new Set(visibleSection);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }

    setVisibleSection(newVisibleSections);
  };

  return (
    <div className={`w-full text-slate-800 dark:text-white ${!isDemo ? 'ml-[-30px] w-full min-h-screen top-24 left-0 z-30' : ''}`}>
      {videoSections.map((section: string) => {
        const isSectionVisible = visibleSection.has(section);
        const sectionVideos: any[] = data.filter((item: any) => item.videoSection === section);
        const sectionVidCount = sectionVideos.length;
        const sectionVidLength = sectionVideos.reduce((acc, item) => acc + item.videoLength, 0);
        const sectionStartIndex = totalCount;
        totalCount += sectionVidCount;
        const sectionVidHours = sectionVidLength / 60;

        return (
          <div key={section} className={`${!isDemo && 'border-b dark:border-white border-slate-600 py-2'}`}>
            <div className="w-full flex justify-between items-center font-bold text-lg">
              <h1>{section}</h1>
              <div className="flex gap-3">
                <div className="flex justify-center items-center gap-3">
                  <button className="mr-4 cursor-pointer" onClick={() => toggleSection(section)}>
                    {isSectionVisible ? (
                      <BsChevronUp size={20} />
                    ) : (
                      <BsChevronDown size={20} />
                    )}
                  </button>
                  {isDemo && <MdOutlineLock size={20} onClick={() => toast.info('Enroll in course to access Data')} />}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mb-2 text-slate-700 dark:text-slate-400">
              <h1>{sectionVidCount} Lessons</h1>
              <div className="flex justify-center items-center">
                <h1>{sectionVidLength < 60 ? sectionVidLength : sectionVidHours.toFixed(1)}</h1>
                <h1>{sectionVidLength > 60 ? 'hours' : 'mins'}</h1>
              </div>
            </div>

            <AnimatePresence initial={false}>
              {isSectionVisible && (
                <motion.div
                  key={section}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full space-y-3 font-normal text-slate-700 dark:text-slate-100"
                >
                  {sectionVideos.map((video: any, index: number) => {
                    return (
                      <div
                        key={video.id}
                        className={`flex flex-col justify-between cursor-pointer items-start ${
                          activeVideo === sectionStartIndex + index ? 'text-blue-600' : ''
                        }`}
                        onClick={() => setActiveVideo(sectionStartIndex + index)}
                      >
                        <div className="flex justify-start items-center gap-4">
                          <IoMdVideocam size={20} />
                          <h1>{video.title}</h1>
                        </div>
                        <h1>{video.videoLength || '10'} minutes</h1>
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default CourseContentList;
