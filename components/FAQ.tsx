import React, { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";
import "/app.css";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';

const FAQ = () => {
  const [faq, setFaq] = React.useState([{ question: '', answer: '' }]);
  const { data } = useGetLayoutQuery('FAQ');
  const [input, setInput] = React.useState('');

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const animationProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: { tension: 170, friction: 70 },
  });

  useEffect(() => {
    setFaq(data?.layout?.faq);
  }, [data]);

  return (
    <animated.div className="" ref={ref} style={animationProps}>
      <h1 className="text-5xl text-[var(--darker)] font-normal text-center dark:text-[var(--white)]">
        Frequently Asked Questions
      </h1>
      <div className="flex gap-10 justify-between items-start py-2">
        <Accordion
          type="single"
          collapsible
          className="text-[var(--darkpurple)] dark:text-slate-200 w-[70%] text-xl space-y-4 mt-16"
        >
          {faq && faq.map((item: any, index) => (
            <div key={index}>
              <AccordionItem value={`item-${index + 1}`}>
                <AccordionTrigger className="font-semibold">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg font-semibold">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
        <div className="flex items-center flex-col gap-6 text-black dark:text-white">
          <Image
            src="/faq boy.png"
            alt=""
            height={1000}
            width={1000}
            className="h-44 w-40"
          />
          <div className="text-center">
            <h3 className="text-[var(--darkpurple)] text-[30px] font-medium dark:text-[var(--darkline)]">
              Any Question?
            </h3>
            <p className="text-[16px] text-[#AFAEAE]">
              You can ask your queries.
            </p>
          </div>
          <div className="w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Here.."
              className="px-4 w-full py-2 rounded-3xl border border-gray-400 bg-transparent"
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              setInput('');
            }}
            className=" text-white w-fit px-[20px] rounded-[40px] shadow-md shadow-purple-300 dark:shadow-[var(--darkpurple)] text-[18px] py-2 bg-gradient-to-br from-[var(--purple)] to-[var(--darkpurple)] hover:scale-105 hover:shadow-lg hover:shadow-[var(--darkpurple)]"
          >
            Send
          </button>
        </div>
      </div>
    </animated.div>
  );
};

export default FAQ;
