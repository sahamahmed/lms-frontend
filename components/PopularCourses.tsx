import React from "react";
import CourseCard from "./CourseCard";
import { useGetCoursesQuery } from "@/redux/features/courses/courseApi";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const PopularCourses = () => {
  const { data } = useGetCoursesQuery({});
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0.1,
    transform: inView ? 'translateY(0)' : 'translateY(100px)',
    config: { tension: 200, friction: 70 },
  });

  return (
    <animated.div style={animationProps} ref={ref} className="space-y-16 relative">
      <h1 className="text-5xl text-[var(--darker)] font-normal dark:text-[var(--white)] text-center">
        Popular Courses
      </h1>

      <div className="grid grid-cols-3 gap-3">
        {data && data?.courses?.map((course: any) => (
          <div key={course._id}>
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </animated.div>
  );
};

export default PopularCourses;
