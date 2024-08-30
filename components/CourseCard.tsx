import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RiStarSFill } from "react-icons/ri";
import { TfiMenuAlt } from "react-icons/tfi";

const CourseCard = ({course}: any) => {
  return (
    <Link href={`/course/${course._id}`}>
      <Card className=" px-4 pt-4 pb-2 shadow-md shadow-purple-200 dark:shadow-[var(--darkbg)] cursor-pointer scale-100 hover:scale-105 opacity-100 h-[22rem] rounded-xl border-slate-300 dark:border-none relativetransition ease-out duration-500 hover:shadow-lg ">
        <div className="relative w-full h-[55%] rounded border border-slate-500">
          <Image
            src={course?.thumbnail?.url ||"/computer.png" }
            alt="thumbnail"
            width={300}
            height={200}
            className="w-full h-full bg-cover rounded-tr-xl rounded-tl-xl relative"
          />
        </div>
        <CardHeader className="h-[25%]  px-0 ">
          <CardTitle className=" ">
            <p className="text-slate-800 dark:text-slate-100 overflow-hidden overflow-ellipsis whitespace-nowrap">
              {course?.name ||'MERN Stack Course For Beginners'}
            </p>
          </CardTitle>
        </CardHeader>

        <div className="flex flex-col dark:text-slate-100  h-[20%] text-slate-600 ">
          <div className="flex justify-between items-center">
            <CardContent className="p-0 flex flex-row justify-center items-center">
              <RiStarSFill className=" text-yellow-400" />
              <RiStarSFill className=" text-yellow-400" />
              <RiStarSFill className=" text-yellow-400" />
              <RiStarSFill className=" text-yellow-400" />
              <RiStarSFill className=" text-yellow-400" />
            </CardContent>

            <CardDescription className="text-slate-600 dark:text-slate-100 ">
              780 students
            </CardDescription>
          </div>

          <CardFooter className="flex flex-row justify-between items-center p-0 mt-2">
            <p>${course?.price}</p>
            <p className="flex flex-row gap-x-1 justify-end items-center">
              <TfiMenuAlt className="" /> 55 Lectures
            </p>
          </CardFooter>
        </div>
      </Card>
    </Link>
  );
};

export default CourseCard;
