import React, { useEffect } from 'react'
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'sonner';
import { TrashIcon } from 'lucide-react';
import { IoAddCircleSharp } from 'react-icons/io5';

type Props = {
  active: number
  setActive: (active: number) => void
  courseContentData: any
  setCourseContentData: (data: any) => void
  handleSubmit: () => void
}

const CourseContent = ({ active, setActive, courseContentData, setCourseContentData, handleSubmit: handleCourseSubmit }: Props) => {
  const [activeSection, setActiveSection] = React.useState(0)
  const [isCollapsed, setIsCollapsed] = React.useState<boolean[]>(Array(courseContentData.length).fill(false));

  


  const validateContentData = (): boolean => {
    for (const section of courseContentData) {
      if (!section.title.trim() || !section.videoSection.trim() || !section.description.trim() || !section.videoUrl.trim() || !section.suggestions.trim()) {
        return false;
      }
      for (const link of section.links) {
        if (!link.title.trim() || !link.url.trim()) {
          return false;
        }
      }
    }
    return true;
  };

  const handleCollapseToggle = (index: number) => {
    setIsCollapsed(isCollapsed.map((value, i) => i === index ? !value : value))
  }

  const handleInputChange = (sectionIndex: number, field: string, value: string) => {
    const updatedData = courseContentData.map((section: any, index: number) => {
      if (index === sectionIndex) {
        // Return a new object with the updated field
        return {
          ...section,
          [field]: value
        };
      }
      return section;
    });
    setCourseContentData(updatedData);
  };


  const handleLinkChange = (sectionIndex: number, linkIndex: number, field: string, value: string) => {
    const updatedData = courseContentData.map((section: any, index: number) => {
      if (index === sectionIndex) {
        const updatedLinks = section.links.map((link: any, lIndex: number) => {
          if (lIndex === linkIndex) {
            return {
              ...link,
              [field]: value,
            };
          }
          return link;
        });

        return {
          ...section,
          links: updatedLinks,
        };
      }
      return section;
    });

    setCourseContentData(updatedData);
  };


 

  const handleAddContent = (index: number) => {
    if (validateContentData()) {
      validateContentData()
      const updatedData = [...courseContentData, {
        title: '',
        description: '',
        videoUrl: '',
        videoSection: courseContentData[index].videoSection,
        links: [{ title: '', url: '' }],
        suggestions: ''
      }]

      setCourseContentData(updatedData)
      setIsCollapsed([...isCollapsed, false])
      
    }else {
      toast.error('Please fill out all fields first.');
    }





  }

  const handleAddLink = (index: number) => {
    if (validateContentData()) {
      const updatedData = [...courseContentData];

      const updatedLinks = [...updatedData[index].links, { title: '', url: '' }];

      updatedData[index] = {
        ...updatedData[index],
        links: updatedLinks,
      };

      setCourseContentData(updatedData);
    } else {
      toast.error('Please fill out all fields first.');
    }
  }

  const handleAddSection = () => {
    if (validateContentData()) {
      setCourseContentData([...courseContentData, {
        title: '',
        description: '',
        videoUrl: '',
        videoSection: `Untitled Section`,
        links: [{ title: '', url: '' }],
        suggestions: ''
      }])

      setIsCollapsed([...isCollapsed, false])
    } else {
      toast.error('Please fill out all fields first.');
    }
  }

  const handleDeleteContentData = (index: number) => {
    const a = [...courseContentData]
   const updatedData = a.filter((c:any, i:number) => i !== index )
    setCourseContentData(updatedData)
  };

  return (
    <div className="w-[80%] dark:text-white ml-8 mt-24 mb-6">
      {courseContentData.map((section: any, index: number) => (
        <div
          key={index}
          className=" dark:text-white dark:bg-[#534e5741] dark:border-gray-800 bg-[#d8afe93b] bg-blur rounded py-4 px-6"
        >
          <div className="flex dark:text-white justify-between items-center">
            <div
              className={` ${courseContentData[index - 1]?.videoSection ===
                  section.videoSection
                  ? "hidden w-full"
                  : "flex gap-x-4 items-center w-full"
                }`}
            >
              <label className="text-lg dark:text-white font-bold">
                Section:
                <input
                  type="text"
                  value={section.videoSection}
                  onChange={(e) =>
                    handleInputChange(index, "videoSection", e.target.value)
                  }
                  className="ml-2 dark:text-white bg-transparent border-none outline-none"
                  placeholder="Enter section name"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="flex justify-center items-center gap-2">
              <label className="font-bold dark:text-white ">
                {index + 1}
                {". "}
              </label>
              <input
                type="text"
                value={section.title}
                onChange={(e) =>
                  handleInputChange(index, "title", e.target.value)
                }
                className="w-full dark:text-white bg-transparent outline-none placeholder:text-gray-500 text-black font-normal placeholder:font-normal "
                placeholder="Enter title"
              />
            </div>

            <div className="flex justify-center items-center">
              <IconButton
                onClick={() => handleCollapseToggle(index)}
                className="text-gray-400 dark:text-white "
              >
                {isCollapsed[index] ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              </IconButton>
              <TrashIcon
                onClick={() => handleDeleteContentData(index)}
                size={24}
                className="font-bold cursor-pointer text-red-800 dark:text-red-500"
              />
            </div>
          </div>

          {!isCollapsed[index] && (
            <>
              <div className="mt-4">
                <label className="block mb-2 font-bold text-[var(--darker)] dark:text-slate-300 ">
                  Description:
                  <textarea
                    value={section.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                    className="w-full dark:text-white bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 placeholder:text-gray-500 text-black font-normal placeholder:font-normal"
                    placeholder="Enter description"
                  />
                </label>
                <label className="block mb-2 font-bold text-[var(--darker)] dark:text-slate-300">
                  Video URL:
                  <input
                    type="text"
                    value={section.videoUrl}
                    onChange={(e) =>
                      handleInputChange(index, "videoUrl", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-400 dark:text-white outline-none mt-1 px-3 py-2 placeholder:text-gray-500 text-black font-normal placeholder:font-normal"
                    placeholder="Enter video URL"
                  />
                </label>
                <label className='block mb-2'>
                  Video Length (in minutes):
                  <input
                    type="text"
                    value={section.videoLength}
                    onChange={(e) => handleInputChange(index, 'videoLength', e.target.value)}
                    className='w-full bg-transparent border border-gray-300 outline-none mt-1'
                    placeholder='20'
                  />
                </label>
                <label className="block mb-2 font-bold text-[var(--darker)] dark:text-slate-300">
                  Suggestions:
                  <textarea
                    value={section.suggestions}
                    onChange={(e) =>
                      handleInputChange(index, "suggestions", e.target.value)
                    }
                    className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 dark:text-white placeholder:text-gray-500 text-black font-normal placeholder:font-normal"
                    placeholder="Enter suggestions"
                  />
                </label>
                <div className="mt-4">
                  {section.links.map((link: any, i: number) => (
                    <div key={i} className="mb-2 ">
                      <label className="block mb-1 font-bold text-[var(--darker)] dark:text-slate-300">
                        Link Title:
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) =>
                            handleLinkChange(index, i, "title", e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 dark:text-white placeholder:text-gray-500 text-black font-normal placeholder:font-normal"
                          placeholder="Enter link title"
                        />
                      </label>
                      <label className="block font-bold text-[var(--darker)] dark:text-slate-300">
                        Link URL:
                        <input
                          type="text"
                          value={link.url}
                          onChange={(e) =>
                            handleLinkChange(index, i, "url", e.target.value)
                          }
                          className="w-full bg-transparent border border-gray-400 outline-none mt-1 px-3 py-2 dark:text-white placeholder:text-gray-500 text-black font-normal placeholder:font-normal"
                          placeholder="Enter link URL"
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col justify-start items-start mt-4 font-bold text-[var(--darker)] dark:text-slate-300">
                <button onClick={() => handleAddLink(index)} className="mb-2">
                  Add new link
                </button>
                <button onClick={() => handleAddContent(index)}>
                  Add new content
                </button>
              </div>
            </>
          )}
        </div>
      ))}

      <div
        onClick={handleAddSection}
        className="flex justify-start items-center mt-6 dark:text-white gap-1 text-slate-900"
      >
        <IoAddCircleSharp
          className="text-[#4A1F64]  cursor-pointer"
          size={26}
        />
        <button>Add new section</button>
      </div>

      <div className="mt-8 flex justify-between">
        <button
          onClick={() => setActive(active - 1)}
          className="bg-[#4A1F64] w-[25%] text-white px-4 py-2 rounded-md"
        >
          Back
        </button>

        <button
          onClick={() => {
            if (validateContentData()) {
              setActive(active + 1);
              handleCourseSubmit();
            } else {
              toast.error("Please fill all fields");
            }
          }}
          className="bg-[#4A1F64] w-[25%]  text-white px-4 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );



}

export default CourseContent
