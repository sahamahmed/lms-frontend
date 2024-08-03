'use client'
import React, { useEffect } from 'react'
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
import { loginSchema } from '@/schemas/loginschema';
import Image from 'next/image';
import { VscGithub } from 'react-icons/vsc';
import { MdOutlineMail } from 'react-icons/md';
import { RiLockPasswordLine } from 'react-icons/ri';
import { useLoginMutation, useSocialLoginMutation } from '@/redux/features/auth/authApi';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { useSelector } from 'react-redux';

const Login = () => {
  const [login, { data, error, isSuccess}] = useLoginMutation()
  const router = useRouter()
  const {data: sessionData}  = useSession()
  console.log(sessionData)
  const {user} = useSelector((state:any) => state.auth)

  const [sociallogin, { error: socialError, isSuccess: socialSuccess, data:socialData}] = useSocialLoginMutation()


  useEffect(() => {
    const handleSocialLogin = async () => {
      if (!user) {
        if (sessionData && sessionData.user) {
          await sociallogin({
            email: sessionData.user.email,
            name: sessionData.user.name,
            avatar: sessionData.user.image,
          });

        }


        if (socialSuccess) {
          console.log("#######################################")

          console.log(data.message);
          console.log("#######################################")

          toast.success(`Welcome ${socialData.user.name}`);
          router.push("/");
        }
      }

   
    };

    handleSocialLogin();
  }, [sessionData, socialSuccess, user]);



  useEffect(() => {
    if (isSuccess) {
      console.log(data.message)
      toast.success(`Welcome ${data.user.name}`)
      router.push("/")
    }

    if (error) {
      if ("data" in error) {
        const ErrorData = error as any
        toast.error(ErrorData.data.message)
      }
    }
  }, [isSuccess, error])

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit(data: any) {
    console.log(data)
    await login({
      email: data.email,
      password: data.password
    })
  }


  return (
    <>
      <div
        style={{
          backgroundImage: "url(/login.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          minHeight: "100vh",
          height: "100%",
          width: "100%"
        }}
        className='h-full'
      >

        <div className="absolute flex gap-y-[21px] flex-col items-center top-[25%] left-[8%] w-[500px]">
          <div className="flex flex-col items-center gap-y-[10px]">
            <h1 className="text-[#5B2C78] font-bold text-[57px] z-50 ">
              LOGIN
            </h1>
            <div className="flex flex-col items-center gap-y-[10px]">
              <div className="flex gap-x-[10px]">
                <FcGoogle className="border rounded-3xl px-1 py-1 border-gray-400 text-4xl cursor-pointer"
                onClick={() => signIn('google')}
                  size={40} />
                <VscGithub className="border rounded-3xl px-1 py-1 border-gray-400 cursor-pointer" size={40} 
                onClick={() => signIn('github')}
                />
              </div>
              <p className="text-gray-400">Or use your email for login</p>
            </div>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center gap-y-[20px] z-20">

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
              <Button type="submit" className=" text-white w-[148px] px-[5px] rounded-[40px] text-[18px] py-[10px] bg-gradient-to-br from-[#5B2C78] to-[#9747FF]">Login</Button>
            </form>
          </Form>
        </div>
        


        <div className="z-10 absolute top-[18%] right-[20%] w-[550px] h-[450px] bg-no-repeat">
          <Image src={`/boy.png`} alt='boy' width={500} height={500} />
        </div>


        <div className="flex flex-col items-center justify-center gap-y-[21px] absolute top-[26%] right-[5%] w-[500px] z-20 ">
          <h1 className="text-[57px] font-bold text-[#5B2C78]">
            New User?
          </h1>
          <p className="text-[16px] text-center w-[285px] text-[#5B2C78]">
            Kindly create an account here and begin your journey.
          </p>
          <Link href={'/signup'}>
            <button className=" w-[148px] px-[5px] rounded-[40px] text-[18px] py-[10px] border-2 border-[#5B2C78] text-gradient-to-br from-[#5B2C78] to-[#9747FF] transition duration-1000 ease-in-out hover:bg-gradient-to-br hover:from-[#9747FF] hover:to-[#5B2C78] hover:border-white hover:text-white">
              Register
            </button>
          </Link>
        </div>
        
      </div>
    </>
  )
}

export default Login