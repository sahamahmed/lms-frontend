import Image from "next/image";
import React from "react";

const FeedbackCards = () => {
  return (
    <div className="relative dark:bg-[var(--course-box-dark-mode-clr)] bg-[#FFFF]  shadow-md shadow-slate-400 dark:shadow-[var(--darkbg)] h-64 w-[30%] px-10 pt-16 rounded-3xl">
      <div className="absolute top-[-60px] left-[-15px] flex justify-between items-center h-32 w-full  ">
        <div className="bg-[var(--darker)] shadow-md shadow-[var(--white)] dark:shadow-[var(--darker)] font-semibold text-[#FBF3FF] h-16 px-6 pb-2 pt-4 rounded-[30px] dark:bg-[var(--st-name-tag-clr)]">
          Student Name
        </div>
        <div className="h-28 w-28 shadow-md shadow-[var(--white)] dark:shadow-[var(--darker)] bg-yellow-100 border border-[var(--darker)] rounded-full">
          <img src="boy.png" className="w-fit h-fit" alt="" />
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-start items-center">
        <div className="w-2 bg-[var(--darker)] h-28 my-auto rounded-sm dark:bg-[var(--st-name-tag-clr)]"></div>
        <p className="tex-black dark:text-slate-200">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
          inventore deleniti est, non vel asperiores. Nam est aliquid dolorum
          porro.
        </p>
      </div>
    </div>
  );
};

export default FeedbackCards;
