import React from "react";
import CourseCard from "./CourseCard";
import Image from "next/image";
import { useGetAllCoursesQuery } from "@/redux/features/courses/courseApi";
const PopularCourses = () => {

  const {data} = useGetAllCoursesQuery({})
  return (
    <div className="space-y-16 relative">
      <h1 className="text-5xl text-[var(--darker)] font-normal dark:text-[var(--white)] text-center">
        Popular Courses
      </h1>

      <div className="grid grid-cols-3 gap-3">
        {
          data && data?.courses?.map((course: any) => (
            <div key={course._id} >
              <CourseCard course={course} />
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default PopularCourses;
