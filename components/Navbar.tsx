"use client";
import Link from "next/link";
import React, { useState } from "react";
import ThemeSwitcher from "../utils/theme-switcher";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { IoNotificationsOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
// import "/App.css";

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

  const { user } = useSelector((state: any) => state.auth);

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
    <div className="w-full relative z-50 py-5 ">
      <div
        className={`${
          active
            ? "bg-no-repeat bg-blue-700 dark:bg-opacity-45 dark:bg-red-900 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[var(--darkline)]"
            : "bg-no-repeat bg-transparent dark:bg-transparent w-full h-[80px] z-[80] border-y-[1.5px] border-[var(--darkline)] dark:border-[var(--darkline)] "
        }`}
      >
        <div className=" py-2 h-full">
          <div className="flex justify-between items-center h-full">
            <div className="flex gap-2 items-center">
              <Link
                href="#"
                className="text-white mr-4 flex justify-items-center"
              >
                <div className="w-[24px] h-[24px] bg-[url(/logo1.png)] bg-contain bg-center bg-no-repeat dark:bg-[url(/logo2.png)]">
                  {" "}
                </div>
                <h1 className="text-[var(--darker)] dark:text-white font-poppins">
                  Elearning
                </h1>
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-4">
              {navItems.map((item, index) => (
                <Link href={item.link} key={index}>
                  <span
                    className={`${
                      item.link === params
                        ? "text-[var(--darkline)] font-semibold dark:text-[var(--darkline)]"
                        : "text-[#424242] dark:text-white hover:text-[var(--darkline)]  hover:font-semibold hover:transition hover:duration-600 dark:hover:text-[var(--darkline)]  "
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

            <div className="flex items-center gap-6 ">
              <ThemeSwitcher />

              {user && (
                <Link href={"/profile"} className="mr-4">
                  <Image
                    src={user?.avatar?.url || "/user.png"}
                    alt="user"
                    width={100}
                    height={100}
                    className="rounded-full border border-slate-700 dark:border-slate-500 h-8 w-8"
                  />
                </Link>
              )}

              {params !== "/login" && params !== "/signup" && !user && (
                <Link
                  href="/login"
                  className="text-[#ebe8ec] mr-4 bg-gradient-to-r from-[var(--darkline)] to-[var(--darker)] py-2 px-6 rounded-full font-normal"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
