import Image from "next/image";
import React from "react";

const FeedbackCards = ({image, name, description}:any) => {
  return (
    <div className="relative dark:bg-[var(--course-box-dark-mode-clr)] bg-[#FFFF]  shadow-md shadow-slate-400 dark:shadow-[var(--darkbg)] h-64 w-[30%] px-10 pt-16 rounded-3xl">
      <div className="absolute top-[-55px] left-[-15px] flex justify-between items-center h-24 w-full  ">
        <div className="bg-[var(--darker)] shadow-md shadow-[var(--white)] dark:shadow-[var(--darker)] font-semibold text-[#FBF3FF] h-12 px-6 pb-2 pt-4 rounded-[30px] dark:bg-[var(--st-name-tag-clr)]">
          {name}
        </div>
        <div className="h-20 w-20 shadow-md shadow-[var(--white)] dark:shadow-[var(--darker)]  border border-[var(--darker)] rounded-full">
          <img src={image} className="w-20 h-20 rounded-full" alt="image" />
        </div>
      </div>

      <div className="flex flex-row gap-4 justify-start items-center">
        <div className="w-2 bg-[var(--darker)] h-28 my-auto rounded-sm dark:bg-[var(--st-name-tag-clr)]"></div>
        <p className="tex-black dark:text-slate-200">
          {description}
        </p>
      </div>
    </div>
  );
};

export default FeedbackCards;
