import React from "react";
import FeedbackCards from "./FeebackCards";

const Feedback = () => {
  return (
    <div className="space-y-16">
      <h1 className="text-5xl text-[#4A1F64] font-normal text-center">
        Student Feeback
      </h1>

      <div className="flex flex-wrap gap-x-6 gap-y-[60px] ">
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
        <FeedbackCards />
      </div>
    </div>
  );
};

export default Feedback;
