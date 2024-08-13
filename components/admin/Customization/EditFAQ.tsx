import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { useEffect } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoAddCircleSharp } from "react-icons/io5";

type Props = {};

const EditFAQ = (props: Props) => {
  const [faq, setFaq] = React.useState([
    {
      question: "",
      answer: "",
    },
  ]);

  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);

  const { data } = useGetLayoutQuery("FAQ");

  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

  useEffect(() => {
    setFaq(data?.layout?.faq);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Updated Successfully");
    }
    if (error) {
      toast.error("Failed to update");
    }
  }, [isSuccess, error]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    updateLayout({
      type: "FAQ",
      faq: faq,
    });
  };

  const handleAddFAQ = () => {
    setFaq([...faq, { question: "", answer: "" }]);
    setEditingIndex(faq.length);
  };

  const handleInputChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    setFaq((prevFaq) =>
      prevFaq.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="w-full  px-5">
      <div className=" mt-4 text-slate-400 dark:text-slate-600 font-semibold text-sm ">
        Click on existing FAQs to edit them
      </div>

      <form onSubmit={handleEdit}>
        {faq &&
          faq.map((item, index) => (
            <Accordion
              key={index}
              type="single"
              collapsible
              className="text-[var(--darkpurple)] dark:text-slate-200 w-[70%] text-xl space-y-4 mt-4"
            >
              <AccordionItem
                value={`item-${index}`}
                onClick={() => {
                  setEditingIndex(index);
                }}
              >
                <AccordionTrigger className="font-semibold">
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={item.question}
                      onChange={(e) =>
                        handleInputChange(index, "question", e.target.value)
                      }
                      className="bg-transparent  outline-none w-full h-full text-inherit"
                    />
                  ) : (
                    item.question
                  )}
                </AccordionTrigger>
                <AccordionContent className="text-lg font-semibold pt-4">
                  {editingIndex === index ? (
                    <textarea
                      value={item.answer}
                      onChange={(e) =>
                        handleInputChange(index, "answer", e.target.value)
                      }
                      className="bg-transparent  outline-none w-full h-full text-inherit"
                    />
                  ) : (
                    item.answer
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}

        <IoAddCircleSharp
          className="text-[#ccc8ce] mt-6 cursor-pointer"
          size={36}
          onClick={handleAddFAQ}
        />

        <div className="mt-8">
          <button
            type="submit"
            className="bg-purple-900 text-white p-2 rounded-md w-36"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditFAQ;
