'use client'
import React, { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { SignupSchema } from '@/schemas/signup.schema';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRegisterMutation } from '@/redux/features/auth/authApi';
import { ifError } from 'assert';
import { toast } from 'sonner';
import Verification from './Verification';
import { signIn } from 'next-auth/react';
import Navbar from './Navbar';



const Signup = () => {

  const [register, { data, error, isSuccess}] = useRegisterMutation()
  const [openVerification, setOpenVerification] = useState(false)

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: any) {
    await register(data)
  }

  useEffect(()=>{
    if(isSuccess){
      console.log( data.message)
      toast.success(data.message)
      setOpenVerification(true)
    }

    if(error){
      if("data" in error){
        const ErrorData = error as any
        toast.error(ErrorData.data.message)
      }
    }
  }, [isSuccess, error])


  return (
    <div  >
      <div
        style={{
          backgroundImage: "url(/registerbg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          height: "100%",
          width: "100%"
        }}
        className={`relative ${openVerification ? 'filter blur-sm' : ''} py-5`}
      >
        <Navbar />

        <div className="flex flex-col items-center justify-center gap-y-[21px] absolute top-[25%] left-[8%] ">
          <h1 className="text-[57px] font-bold text-[#5B2C78]">
            Welcome Back!
          </h1>
          <p className="text-[16px] text-center w-[285px] text-[#5B2C78]">
            Already have an account? please login with your personal info.
          </p>
          <Link href={'/login'}>
            <button className=" w-[148px] px-[5px] rounded-[40px] text-[18px] py-[10px] border-2 border-[#5B2C78] text-gradient-to-br from-[#5B2C78] to-[#9747FF] transition duration-1000 ease-in-out hover:bg-gradient-to-br hover:from-[#9747FF] hover:to-[#5B2C78] hover:border-white hover:text-white">
           Login
          </button>
          </Link>
        </div>


        <div className="z-10 absolute top-[20%] left-[28%] w-[550px] h-[450px] bg-no-repeat">
          <Image src={`/boy.png`} alt='boy' width={500} height={500} />
        </div>


        <div className="absolute flex gap-y-[21px] flex-col items-center top-[18%] right-[5%] w-[500px]">
          <div className="flex flex-col items-center gap-y-[10px]">
            <h1 className="text-[#5B2C78] font-bold text-[57px] ">
              Create Account
            </h1>
            <div className="flex flex-col items-center gap-y-[10px]">
             
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-[20px]">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative flex border px-[20px] py-[10px] border-[#AFAEAE] rounded-3xl items-center">
                      <RxAvatar className="absolute left-3 text-gray-400" size={24} />
                      <input
                        {...field}
                        name="name"
                        className="pl-10 placeholder:text-[#AFAEAE] bg-transparent border-none outline-none focus:outline-none focus:border-none w-full"
                        placeholder="Name"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative flex border px-[20px] py-[10px] border-[#AFAEAE] rounded-3xl items-center">
                      <MdOutlineMail className="absolute left-3 text-gray-400" size={24} />
                      <input
                        {...field}
                        name="email"
                        className="pl-10 placeholder:text-[#AFAEAE] bg-transparent border-none outline-none focus:outline-none focus:border-none w-full"
                        placeholder="Email"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative flex border px-[20px] py-[10px] border-[#AFAEAE] rounded-3xl items-center">
                      <RiLockPasswordLine className="absolute left-3 text-gray-400" size={24} />
                      <input
                        type="password"
                        {...field}
                        name="password"
                        className="pl-10 placeholder:text-[#AFAEAE] bg-transparent border-none outline-none focus:outline-none focus:border-none w-full"
                        placeholder="Password"
                      />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className=" text-white w-[148px] px-[5px] rounded-[40px] text-[18px] py-[10px] bg-gradient-to-br from-[#5B2C78] to-[#9747FF]">Signup</Button>
            </form>
          </Form>

        </div>
      </div>
      {
        openVerification && (
          <Verification onClose={() => setOpenVerification(false)} />
        )
      }
    </div>
  )
}

export default Signup


