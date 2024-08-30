"use client";
import { FC, useState } from "react";
import Header from "../components/Header";
import Seperator from "@/components/Seperator";
import Metrics from "@/components/Metrics";
import PopularCourses from "@/components/PopularCourses";
import Feedback from "@/components/Feedback";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Shadow from "@/components/Shadow";

interface Props {}

const Page: FC<Props> = (props) => {
  return (
    <div className="px-28 py-5 h-fit relative bg-[#F7F1FF] bg-no-repeat dark:bg-slate-950 transition-all duration-1000 ease-out ">
      <Shadow />
      <Navbar />

      <Header />
      <Seperator />
      <Metrics />
      <Seperator />
      <PopularCourses />
      <Seperator />
      <Feedback />
      <Seperator />
      <FAQ />
      <Seperator />
      <Footer />
    </div>
  );
};

export default Page;
