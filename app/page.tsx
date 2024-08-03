'use client'
import { FC, useState } from "react"
import Header from "../components/Header"
import { useSelector, UseSelector } from "react-redux"
import Image from "next/image"
import Seperator from "@/components/Seperator"
import Metrics from "@/components/Metrics"
import PopularCourses from "@/components/PopularCourses"
import Feedback from "@/components/Feedback"
import FAQ from "@/components/FAQ"
import Footer from "@/components/Footer"

interface Props{

}


const Page: FC<Props> = (props) => {


  return (
    <div className="px-28 py-5 h-fit ">
      <div>
        <Image src="/Ellipse.png" alt="hero" width={500} height={500} className="absolute right-0 top-0 h-[450px]" />
        <Image src="/Rectangle.png" alt="hero" width={500} height={500} className="absolute left-0 h-[80%] top-0  w-[7%]  " />
      </div>
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
  )
}

export default Page