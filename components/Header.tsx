"use client";
import Link from "next/link";
import React, { useState } from "react";
import ThemeSwitcher from "../utils/theme-switcher";
import Navbar from "./Navbar";
import Image from "next/image";
import "/App.css";
import { useGetLayoutQuery } from "@/redux/features/layout/layoutApi";
const Header = () => {

  const { data } = useGetLayoutQuery('Banner');

  return (
    <div className="space-y-8 min-h-full h-auto">
      <div className="grid grid-cols-12">
        <div className=" col-span-8 z-10">
          <div className="flex gap-4">
            <div className="w-8 h-[200px] bg-gradient-to-br from-[#A581F0] to-[var(--darker)] rounded-lg shadow-xl shadow-[#9776C1]"></div>
            <div className="flex flex-col justify-center gap-2 h-full">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold font-[josefin] text-[var(--darker)] dark:text-[var(--white)]">
               {data?.layout?.banner.title}
              </h1>
              <p className="text-lg text-[#5B2C78] dark:text-[var(--white)] mt-4">
                {data?.layout?.banner.subTitle}
              </p>
              <div className="my-8">
                <Link
                  href={"/courses"}
                  className="text-[#ebe8ec] py-4 bg-gradient-to-tl from-[var(--purple)] to-[var(--darkpurple)]  px-8 rounded-full font-normal mt-8 border border-purple-950 shadow-lg shadow-purple-200 hover:scale-105  hover:shadow-purple-300 dark:hover:shadow-xl dark:shadow-[var(--darkbg)] "
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={data?.layout?.banner.image.url}
          alt="hero"
          width={500}
          height={600}
          className="col-span-4 z-10 h-full"
        />
      </div>
    </div>
  );
};

export default Header;
