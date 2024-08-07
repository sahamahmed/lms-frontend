import React from "react";
import { PiUsersThreeDuotone } from "react-icons/pi";
import { IoStarOutline } from "react-icons/io5";
import { BsGlobe2 } from "react-icons/bs";

const Metrics = () => {
  return (
    <div className="space-y-16">
      <h1 className="text-5xl text-[var(--darker)] font-normal text-center dark:text-[var(--white)]">
        User Metrics & Engagement Statistics
      </h1>
      <div className="flex justify-between font-[poppins]">
        <div className="flex flex-col justify-center items-center gap-1">
          <PiUsersThreeDuotone
            className=" text-[var(--darkpurple)] dark:text-[var(--lightest)]"
            size={40}
          />
          <h1 className="text-4xl dark:text-[var(--lightest)] text-[var(--darkpurple)] font-normal">
            10.2 k
          </h1>
          <h1 className="text-xl dark:text-[var(--lightest)] text-[var(--darkpurple)] font-normal">
            Total Enrollments
          </h1>
        </div>
        <div className="w-[2px] bg-[var(--darkline)] h-12 my-auto"></div>
        <div className="flex flex-col justify-center items-center gap-1">
          <IoStarOutline
            className=" dark:text-[var(--lightest)] text-[var(--darkpurple)]"
            size={40}
          />
          <h1 className="text-4xl dark:text-[var(--lightest)] text-[var(--darkpurple)] font-normal">
            90 %
          </h1>
          <h1 className="text-xl dark:text-[var(--lightest)] text-[var(--darkpurple)] font-normal">{`Learners' Satisfaction`}</h1>
        </div>
        <div className="w-[2px] bg-[var(--darkline)] h-12 my-auto"></div>
        <div className="flex dark:text-[var(--lightest)] flex-col justify-center items-center gap-1">
          <BsGlobe2
            className=" dark:text-[var(--lightest)] text-[var(--darkpurple)]"
            size={40}
          />
          <h1 className="text-4xl dark:text-[var(--lightest)] text-[var(--darkpurple)] font-normal">
            5K +
          </h1>
          <h1 className="text-xl dark:text-[var(--lightest)] text-[var(--darkpurple)] font-normal">
            Daily Users
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
