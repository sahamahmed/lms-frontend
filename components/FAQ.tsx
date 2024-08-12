import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import "/app.css";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
const FAQ = () => {

  const [faq, setFaq] = React.useState([{
    question: '',
    answer: ''
  }]);
  const { data } = useGetLayoutQuery('FAQ');


  useEffect(() => {
    setFaq(data?.layout?.faq);
  }, [data]);

  return (
    <div className="">
      <h1 className="text-5xl text-[var(--darker)] font-normal text-center dark:text-[var(--white)]">
        Frequently Asked Questions
      </h1>
      <div className="flex gap-10 justify-between items-start py-2">
        <Accordion
          type="single"
          collapsible
          className="text-[var(--darkpurple)] dark:text-slate-200 w-[70%] text-xl space-y-4 mt-16"
        >
          {
            faq && faq.map((item:any, index) => (
              <>
                <AccordionItem value={`item-${index+1}`} key={index}>
                  <AccordionTrigger className="font-semibold">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-lg font-semibold">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </>
            ))
          }
        </Accordion>
        <div className="flex items-center flex-col gap-6 ">
          <Image
            src="/faq boy.png"
            alt=""
            height={1000}
            width={1000}
            className="h-44 w-40"
          />
          <div className="text-center">
            {" "}
            <h3 className="text-[var(--darkpurple)] text-[30px] font-medium dark:text-[var(--darkline)]">
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
            className=" text-white w-fit px-[20px] rounded-[40px] shadow-md shadow-purple-300 dark:shadow-[var(--darkpurple)] text-[18px] py-2 bg-gradient-to-br from-[var(--purple)] to-[var(--darkpurple)] hover:scale-105 hover:shadow-lg hover:shadow-[var(--darkpurple)]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
