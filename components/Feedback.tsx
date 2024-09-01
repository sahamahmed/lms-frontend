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
        <FeedbackCards image={'user.png'} name={'Brian'} description={"The platform is user-friendly, making it easy to navigate through different courses and resources."} />
        <FeedbackCards image={'person2.png'} name={'Sarah'} description={"I find the variety of courses available to be impressive, catering to different interests and skill levels."} />
        <FeedbackCards image={'user.png'} name={'Ahmed'} description={"The support and feedback provided during the courses have been very helpful in my learning journey."} />
        <FeedbackCards image={'person3.jpg'} name={'Ali'} description={"The platforms layout and design contribute to a smooth and enjoyable learning experience."} />
        <FeedbackCards image={'user.png'} name={'Shahzaib'} description={"Very good experience. Quality content throughout."} />
        <FeedbackCards image={'user.png'} name={'Alex'} description={"Been using this platform for a while, never disappointed."} />

      </div>
    </animated.div>
  );
};

export default Feedback;
