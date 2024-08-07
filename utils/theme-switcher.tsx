"use client";
import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <div>
      {theme === "light" ? (
        <BiMoon
          onClick={() => setTheme("dark")}
          className="text-2xl  cursor-pointer"
        />
      ) : (
        <BiSun
          onClick={() => setTheme("light")}
          className='text-2xl cursor-pointer  className="text-[#070607] dark:text-white dark:hover:text-[var(--darkline)]  dark:hover:font-semibold dark:hover:transition dark:hover:duration-600"'
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
