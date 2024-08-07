"use client";
import Link from "next/link";
import React, { useState } from "react";
import ThemeSwitcher from "../utils/theme-switcher";
import Navbar from "./Navbar";
import Image from "next/image";
import "/App.css";
const Header = () => {
  return (
    <div className="space-y-8 min-h-full h-auto">
      <div className="grid grid-cols-12">
        <div className=" col-span-8 z-10">
          <div className="flex gap-4">
            <div className="w-8 h-[200px] bg-gradient-to-br from-[#A581F0] to-[var(--darker)] rounded-lg shadow-xl shadow-[#9776C1]"></div>
            <div className="flex flex-col justify-center gap-2 h-full">
              <h1 className="text-2xl md:text-4xl lg:text-6xl font-semibold font-[josefin] text-[var(--darker)] dark:text-[var(--white)]">
                Revolutionize Education with{" "}
                <span className="text-[var(--darkline)]">Personalized</span>{" "}
                Learning Paths
              </h1>
              <p className="text-lg text-[#5B2C78] dark:text-[var(--white)]">
                Study any topic, anytime. Choose from a number of expert-led
                courses now.
              </p>
              <div className="my-8">
                <Link
                  href={"/courses"}
                  className="text-[#ebe8ec] bg-gradient-to-tl from-[var(--purple)] to-[var(--darkpurple)] py-2 px-6 rounded-full font-normal mt-8 border border-purple-800 shadow-lg shadow-purple-200 hover:scale-105  hover:shadow-purple-300 dark:hover:shadow-xl dark:shadow-[var(--darkbg)] "
                >
                  Start Learning
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Image
          src={"/computer.png"}
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
