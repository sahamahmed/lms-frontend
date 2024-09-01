"use client";
import React, { useEffect, useState } from "react";
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
import { SignupSchema } from "@/schemas/signup.schema";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { VscGithub } from "react-icons/vsc";
import { RiLockPasswordLine } from "react-icons/ri";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { ifError } from "assert";
import { toast } from "sonner";
import Verification from "./Verification";
import { signIn } from "next-auth/react";
import Navbar from "./Navbar";

const Signup = () => {
  const [register, { data, error, isSuccess }] = useRegisterMutation();
  const [openVerification, setOpenVerification] = useState(false);

  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    await register(data);
  }

  useEffect(() => {
    if (isSuccess) {
      console.log(data.message);
      toast.success(data.message);
      setOpenVerification(true);
    }

    if (error) {
      if ("data" in error) {
        const ErrorData = error as any;
        toast.error(ErrorData.data.message);
      }
    }
  }, [isSuccess, error]);

  return (
    <div>
      <div
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          height: "100%",
          width: "100%",
        }}
        className={
          "h-full py-5 bg-[url(/signup.png)] dark:bg-[url(/darkSignup.png)] transition-all duration-1000 ease-out"
        }
      >
        <div className="px-28 ">
          {" "}
          <Navbar />
        </div>

        <div className="flex flex-col items-center justify-center gap-y-[21px] absolute top-[32%] left-[8%] ">
          <h1 className="text-[57px] font-bold text-[#5B2C78]  dark:text-white">
            Welcome Back!
          </h1>
          <p className="text-[16px] text-center w-[285px] text-[#5B2C78] dark:text-white">
            Already have an account? please login with your personal info.
          </p>
          <Link href={"/login"}>
            <button className="px-11 rounded-[40px] font-medium text-[18px] py-[10px] border-2 border-[#5B2C78] text-[#5B2C78] transition duration-1000 ease-in-out hover:bg-gradient-to-br hover:from-[var(--darkpurple)] hover:to-[var(--purple)] hover:border-none hover:scale-105 hover:shadow-md dark:hover:shadow-[var(--darker)] hover:shadow-[var(--lighter)] hover:text-white dark:text-white dark:border-white dark:hover:bg-gradient-to-br dark:hover:from-[var(--darker] dark:hover:to-[var(--darkline)]">
              Login
            </button>
          </Link>
        </div>
        <div className="absolute flex gap-y-[21px] flex-col items-center top-[25%] right-[10%] w-[420px]">
          <div className="flex flex-col items-center gap-y-[10px]">
            <h1 className="text-[#5B2C78] dark:text-[var(--white)] font-bold text-[57px] ">
              Create Account
            </h1>
            
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center gap-y-[20px]"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative w-full flex border px-[20px] py-[10px] border-[#AFAEAE] rounded-3xl items-center dark:text-slate-200">
                      <RxAvatar
                        className="absolute left-3 text-gray-400"
                        size={24}
                      />
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
                    <div className="relative dark:text-slate-200 flex border px-[20px] py-[10px] border-[#AFAEAE] rounded-3xl items-center">
                      <MdOutlineMail
                        className="absolute left-3 text-gray-400"
                        size={24}
                      />
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
                    <div className="relative flex border px-[20px] py-[10px] dark:text-slate-200 border-[#AFAEAE] rounded-3xl items-center">
                      <RiLockPasswordLine
                        className="absolute left-3 text-gray-400"
                        size={24}
                      />
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
              <Button
                type="submit"
                className=" text-white hover:scale-105 px-10 shadow-md shadow-[var(--lighter)] hover:shadow-lg hover:shadow-[var(--darker)] rounded-[40px] text-[18px] py-[10px] bg-gradient-to-br from-[var(--darker)] to-[var(--purple)] dark:shadow-[var(--dark-bg)]"
              >
                Signup
              </Button>
            </form>
          </Form>
        </div>
      </div>
      {openVerification && (
        <Verification onClose={() => setOpenVerification(false)} />
      )}
    </div>
  );
};

export default Signup;
