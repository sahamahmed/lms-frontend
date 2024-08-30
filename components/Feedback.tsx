import React from "react";
import FeedbackCards from "./FeebackCards";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

const Feedback = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 200, friction: 70 },
  });

  return (
    <animated.div style={animationProps} ref={ref} className="space-y-16 relative">
      <h1 className="text-5xl text-[var(--darker)] font-normal text-center dark:text-[var(--white)]">
        Student Feedback
      </h1>
      <div className="flex flex-wrap gap-x-6 gap-y-[60px]">
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
      </div>
    </animated.div>
  );
};

export default Feedback;
