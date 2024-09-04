'use client'
import CourseCard from '@/components/CourseCard'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Seperator from '@/components/Seperator'
import { useGetCoursesQuery } from '@/redux/features/courses/courseApi'
import { useGetLayoutQuery } from '@/redux/features/layout/layoutApi'
import Image from 'next/image'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const searchParams = useSearchParams();
  const search = searchParams?.get('title');
  const { data, isLoading } = useGetCoursesQuery({});
  const { data: categoriesData } = useGetLayoutQuery("Category", {});
  const [courses, setCourses] = useState<any>([]);
  const [category, setCategory] = useState<any>("All");

  useEffect(() => {
    if (data?.courses) {
      let filteredCourses = data.courses;

      if (category !== "All") {
        filteredCourses = filteredCourses.filter((course: any) => course.categories == category);
      }

      if (search) {
        filteredCourses = filteredCourses.filter((course: any) =>
          course.name.toLowerCase().includes(search.toLowerCase())
        );
      }

      setCourses(filteredCourses);
    }
  }, [data, category, search]);

  return (
    <>
      <div className="px-16 py-5 text-slate-800 dark:text-slate-200">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <main className="space-y-8 w-full">
            <div className="w-[90%] mx-auto flex gap-6 flex-wrap">
              <button
                onClick={() => setCategory('All')}
                className={`text-white ${category == 'All' ? 'bg-purple-500' : 'bg-red-500'} px-4 py-2 rounded-full`}
              >
                All
              </button>
              {categoriesData?.layout?.categories?.map((item: any) => (
                <div key={item._id}>
                  <button
                    onClick={() => setCategory(item.title)}
                    className={`text-white ${category == item.title ? 'bg-purple-500' : 'bg-red-500'} px-4 py-2 rounded-full`}
                  >
                    {item.title}
                  </button>
                </div>
              ))}
            </div>

            {/* Display Search Results or No Results Message */}
            <div className="my-4">
              {search && courses.length > 0 && (
                <h1 className="font-semibold text-xl text-center my-6">
                  Showing Results for {`"${search}"`}
                </h1>
              )}

              {courses.length === 0 ? (
                <h1 className="font-semibold text-xl text-center my-6">
                  {search ? `No results found for "${search}"` : 'No courses found'}
                </h1>
              ) : (
                <div className="grid grid-cols-3 gap-5">
                  {courses.map((course: any) => (
                    <div key={course._id}>
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        )}
      </div>
      <Seperator />
      <Footer />
    </>
  );
};

export default Page;
