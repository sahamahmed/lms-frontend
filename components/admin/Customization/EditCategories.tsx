import {
  useGetLayoutQuery,
  useUpdateLayoutMutation,
} from "@/redux/features/layout/layoutApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import { toast, Toaster } from "sonner";
import { RxCrossCircled } from "react-icons/rx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { IoAddCircleSharp } from "react-icons/io5";
import { Chip } from "@mui/material";

type Props = {};

const EditCategories = (props: Props) => {
  const [categories, setCategories] = useState([{ title: "" }]);

  const { data, refetch } = useGetLayoutQuery("Category", {
    refetchOnMountOrArgChange: true,
  });

  const [updateLayout, { isSuccess, error }] = useUpdateLayoutMutation();

  useEffect(() => {
    setCategories(data?.layout?.categories);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Updated Successfully");
    }
    if (error) {
      toast.error("Failed to update");
    }
  }, [isSuccess, error]);

  const handleEdit = async (e: any) => {
    e.preventDefault();
    updateLayout({
      type: "Category",
      categories: categories,
    });
  };

  const handleAddCategory = () => {
    if (categories[categories.length - 1].title === "") {
      toast.error("Please fill the existing category before adding a new one");
    } else {
      setCategories([...categories, { title: "" }]);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((category, i) => {
        if (i === index) {
          return { ...category, title: value };
        } else {
          return category;
        }
      })
    );
  };
  
  return (
    <div className="w-full min-h-screen bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950 px-5">
      <h1 className="text-center text-2xl font-bold dark:text-slate-300 mb-6">
        CATEGORIES
      </h1>

      <div className=" my-4 text-slate-400 dark:text-slate-600 font-semibold text-sm ">
        Click on existing categories to edit them
      </div>

      <div className=" font-semibold text-slate-900 text-lg flex flex-wrap gap-3  ">
        {categories &&
          categories?.map((category, index) => (
            <div
              key={index}
              className="relative dark:bg-slate-300 shadow-md dark:shadow-slate-400 bg-purple-200 shadow-purple-300 rounded-lg py-3 min-w-24 text-center"
            >
              <input
                type="text"
                value={category.title}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="border-none focus:border-none focus:outline-none bg-transparent text-center w-auto "
              />
            </div>
          ))}

        <IoAddCircleSharp
          className="text-[#ccc8ce] mt-6 cursor-pointer"
          size={36}
          onClick={handleAddCategory}
        />
      </div>

      <div className="mt-8">
        <button
          type="submit"
          className="bg-purple-900 text-white p-2 rounded-md w-36"
          onClick={handleEdit}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default EditCategories;
