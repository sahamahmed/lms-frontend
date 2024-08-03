import Image from "next/image";
import React from "react";

const FeedbackCards = () => {
  return (
    <div className="relative bg-[#FFFF] opacity-90 shadow-md shadow-gray-400 h-64 w-[30%] px-10 pt-16 rounded-3xl">
      <div className="absolute top-[-60px] left-[-15px] flex justify-between items-center h-32 w-full ">
        <div className="bg-[#4A1F64] shadow-md shadow-gray-400 font-semibold text-[#FBF3FF] h-16 px-6 pb-2 pt-4 rounded-[30px]">
          Student Name
        </div>
        <div className="h-28 w-28 shadow-md shadow-gray-300 bg-yellow-100 border border-[#4A1F64] rounded-full">
          <img src="boy.png" className="w-fit h-fit" alt="" />
        </div>
      </div>

      <div className="flex flex-row gap-2 justify-start items-center">
        <div className="w-2 bg-[#4A1F64] h-24 my-auto rounded-sm"></div>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus
          inventore deleniti est, non vel asperiores. Nam est aliquid dolorum
          porro.
        </p>
      </div>
    </div>
  );
};

export default FeedbackCards;
