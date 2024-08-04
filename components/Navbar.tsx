'use client'
import Link from "next/link";
import React, { useState } from "react";
import ThemeSwitcher from "../utils/theme-switcher";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { Dice1 } from "lucide-react";

const navItems = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Courses",
    link: "/courses",
  },
  {
    name: "About",
    link: "/about",
  },
];

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const params = usePathname();

  const {user} = useSelector((state: any) => state.auth)


  // if (typeof window !== 'undefined') {
  //   window.addEventListener('scroll', () => {
  //     if (window.scrollY > 80) {
  //       setActive(true)
  //     } else {
  //       setActive(false)
  //     }
  //   })
  // }

  return (
    <div className="w-full relative z-50 px-28 py-5 ">
      <div
        className={`${
          active
            ? "bg-no-repeat bg-blue-700 dark:bg-opacity-45 dark:bg-red-950 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#167c52]"
            : "bg-no-repeat bg-transparent dark:bg-green-900  w-full h-[80px] z-[80] border-y-[1.5px] border-[#5B2C78] dark:border-[#127463] dark:shadow"
        }`}
      >
        <div className=" py-2 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <Link
                href="#"
                className="text-white mr-4 flex justify-items-center"
              >
                <Image
                  src="/logo2.png"
                  alt="logo"
                  width={600}
                  height={500}
                  className="h-6 w-8"
                />
                <h1 className="text-[#5B2C78] font-poppins">Elearning</h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item, index) => (
                <Link href={item.link} key={index}>
                  <span
                    className={`${
                      item.link === params
                        ? "text-[#4A1F64] font-semibold dark:text-[#424242]"
                        : "text-[#424242] dark:text-green-500"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>

            {isMobile && (
              <div className="flex md:hidden items-center gap-4 ">
                {navItems.map((item, index) => (
                  <Link href={item.link} key={index}>
                    <span
                      className={`${
                        params == item.link
                          ? "text-yellow-500 dark:text-blue-300"
                          : "text-white dark:text-green-500"
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                ))}
                <ThemeSwitcher />
              </div>
            )}

            <div className="flex items-center gap-6">
              <ThemeSwitcher />

              <IoNotificationsOutline className="text-[#4A1F64] text-2xl" />

              {
                user && user.avatar.url  && (
                  <Link href={'/profile'}>
                    <Image src={user?.avatar?.url || '/user.png'} alt="user" width={100} height={100} className="rounded-full h-8 w-8" />
                  </Link>
                )
              }


              {
                params !== "/login" && params !== "/signup" && (
                  (
                    <Link href="/signup"
                      className="text-[#ebe8ec] bg-gradient-to-r from-[#4A1F64] to-[#CAADF0] py-2 px-6 rounded-full font-normal"
                    >
                      signup
                    </Link>
                  )
                )
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
