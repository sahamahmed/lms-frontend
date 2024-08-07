import React from "react";
import CourseCard from "./CourseCard";
import Image from "next/image";
const PopularCourses = () => {
  return (
    <div className="space-y-16 relative">
      <h1 className="text-5xl text-[var(--darker)] font-normal dark:text-[var(--white)] text-center">
        Popular Courses
      </h1>

      <div className="grid grid-cols-3 gap-6 ">
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </div>
  );
};

export default PopularCourses;
