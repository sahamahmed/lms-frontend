import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";

const FAQ = () => {
  return (
    <div className="">
      <h1 className="text-5xl text-[#4A1F64] font-normal text-center">
        Frequently Asked Questions
      </h1>
      <div className="flex gap-10 justify-between items-start py-2">
        <Accordion
          type="single"
          collapsible
          className="text-[#4A1F64] w-[80%] text-xl space-y-4 mt-16"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-semibold">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="font-semibold">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-semibold">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="font-semibold">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-semibold">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="font-semibold">
              Is it accessible?
            </AccordionTrigger>
            <AccordionContent className="text-lg font-semibold">
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <div className="flex items-center flex-col gap-6 ">
          <Image src="/faq boy.png" alt="" height={1000} width={1000} className="h-44 w-40"/>
          <div className="text-center">
            {" "}
            <h3 className="text-[#4A1F64] text-[30px] font-medium">
              Any Question?
            </h3>
            <p className="text-[16px] text-[#AFAEAE]">
              You can ask anything you want to know.
            </p>
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter Here.."
              className="px-4 w-full py-2 rounded-3xl border border-gray-400 bg-transparent"
            />
          </div>
          <button
            type="submit"
            className=" text-white w-fit px-[20px] rounded-[40px] shadow-md shadow-[#4A1F64] text-[18px] py-2 bg-gradient-to-br from-[#4A1F64] to-[#b792e7]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
