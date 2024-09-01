"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { FcGoogle } from "react-icons/fc";
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
import { loginSchema } from "@/schemas/loginschema";
import Image from "next/image";
import { VscGithub } from "react-icons/vsc";
import { MdOutlineMail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  useLoginMutation,
  useSocialLoginMutation,
} from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import "/app.css";
const Login = () => {
  const [login, { data, error, isSuccess }] = useLoginMutation();
  const router = useRouter();
  const { data: sessionData } = useSession();
  console.log(sessionData);
  const { user } = useSelector((state: any) => state.auth);
  console.log(user);
  const [sociallogin, { isSuccess: socialSuccess, data: socialData }] =
    useSocialLoginMutation();

  console.log(socialData);

  useEffect(() => {
    const handleSocialLogin = async () => {
      if (!user) {
        if (sessionData && sessionData?.user) {
          await sociallogin({
            email: sessionData.user.email,
            name: sessionData.user.name,
            avatar: sessionData.user.image,
          })
        }
      }
    };

    handleSocialLogin();
  }, [sessionData, user, sociallogin, router]);

  useEffect(() => {
    if (socialSuccess) {
      router.push("/");
    }
  }, [socialSuccess, socialData]);

  useEffect(() => {
    if (isSuccess) {
      console.log(data.message);
      router.push("/");
    }

    if (error) {
      if ("data" in error) {
        const ErrorData = error as any;
        toast.error(ErrorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: any) {
    console.log(data);
    await login({
      email: data.email,
      password: data.password,
    });
  }

  return (
    <>
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
          "h-full py-5 bg-[url(/login.png)] dark:bg-[url(/darkLogin.png)] bg-[#F7F1FF] dark:bg-slate-950 transition-all duration-1000 ease-out"
        }
      >
        <div className="px-28 ">
          {" "}
          <Navbar />
        </div>

        <div className="absolute flex gap-y-[21px] flex-col items-center top-[25%] left-[13%] w-[420px]">
          <div className="flex flex-col items-center gap-y-[10px]">
            <h1 className="text-[#5B2C78] dark:text-[var(--white)] font-bold text-[57px] z-50 ">
              LOGIN
            </h1>
            <div className="flex flex-col items-center gap-y-[10px]">
              <div className="flex gap-x-[10px]">
                <FcGoogle
                  className="border rounded-3xl px-1 py-1 border-gray-400 text-4xl cursor-pointer"
                  onClick={() => signIn("google")}
                  size={40}
                />
                <VscGithub
                  className="border rounded-3xl px-1 py-1 border-gray-400 cursor-pointer dark:text-gray-200"
                  size={40}
                  onClick={() => signIn("github")}
                />
              </div>
              <p className="text-gray-400">Or use your email for login</p>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col items-center gap-y-[20px] z-20"
            >
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
                    <div className="relative dark:text-slate-200  flex border px-[20px] py-[10px] border-[#AFAEAE] rounded-3xl items-center">
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
                Login
              </Button>
            </form>
          </Form>
        </div>

        <div className="flex flex-col items-center justify-center gap-y-[21px] absolute top-[32%] right-[5%] w-[500px] z-20">
          <h1 className="text-[57px] font-bold text-[#5B2C78] dark:text-white">
            New User?
          </h1>
          <p className="text-[16px] text-center w-[285px] text-[#5B2C78] dark:text-white">
            Kindly create an account here and begin your journey.
          </p>
          <Link href={"/signup"}>
            <button className="px-11 rounded-[40px] font-medium text-[18px] py-[10px] border-2 border-[#5B2C78] text-[#5B2C78] transition duration-1000 ease-in-out hover:bg-gradient-to-br hover:from-[var(--darkpurple)] hover:to-[var(--purple)] hover:border-none hover:scale-105 hover:shadow-md dark:hover:shadow-[var(--darker)] hover:shadow-[var(--lighter)] hover:text-white dark:text-white dark:border-white dark:hover:bg-gradient-to-br dark:hover:from-[var(--darker] dark:hover:to-[var(--darkline)]">
              Register
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
