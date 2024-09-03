"use client";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { useSelector } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import { SiCoursera } from "react-icons/si";
import { PiPasswordBold } from "react-icons/pi";
import { RiLogoutCircleLine, RiAdminLine } from "react-icons/ri";
import UserInfo from "@/components/UserInfo";
import UserPassword from "@/components/userPassword";
import EnrolledCourses from "@/components/EnrolledCourses";
import Link from "next/link";
import { useRouter } from "next/navigation";
import UseProtected from "@/hooks/useProtected";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog"; 

const Page = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [tab, setTab] = React.useState("My Account");
  const [logoutState, setLogoutState] = React.useState(false);
  const data = useSession();
  console.log(data)
  const router = useRouter();

  useLogoutQuery(undefined, {
    skip: !logoutState ? true : false,
  });

  const logoutHandler = async () => {
    if (data.data !== null) {
      console.log('if ran')
      await signOut().then(() => setLogoutState(true));
    }
    if (data.data === null) {
      console.log('else ran')
      setLogoutState(true);
    }
  };

  return (
    <UseProtected>
      <div className="mx-auto w-full flex gap-10">
        <div className="bg-[#d5b8fa9f] dark:bg-[#3311475e] min-h-[30rem] w-[25%] rounded-lg flex flex-col pb-4">
          <section
            className={`py-4 border-b border-b-slate-200 cursor-pointer ${tab === "My Account" ? "bg-[#685275]" : ""
              }`}
            onClick={() => setTab("My Account")}
          >
            <div className="flex justify-start items-center gap-3 px-6">
              <VscAccount className="text-black dark:text-slate-200 text-2xl" />
              <h1 className="text-black dark:text-slate-200 text-xl font-normal">
                My Account
              </h1>
            </div>
          </section>

          {data.data === null && (
            <section
              className={`py-4 border-b border-b-slate-200 cursor-pointer ${tab === "Change Password" ? "bg-[#685275]" : ""
                }`}
              onClick={() => setTab("Change Password")}
            >
              <div className="flex justify-start items-center gap-3 px-6">
                <PiPasswordBold className="text-black dark:text-slate-200 text-2xl" />
                <h1 className="text-black dark:text-slate-200 text-xl font-normal">
                  Change Password
                </h1>
              </div>
            </section>
          )}

          <section
            className={`py-4 border-b border-b-slate-200 cursor-pointer ${tab === "Enrolled Courses" ? "bg-[#685275]" : ""
              }`}
            onClick={() => setTab("Enrolled Courses")}
          >
            <div className="flex justify-start items-center gap-3 px-6">
              <SiCoursera className="text-black dark:text-slate-200 text-2xl" />
              <h1 className="text-black dark:text-slate-200 text-xl font-normal">
                Enrolled Courses
              </h1>
            </div>
          </section>

          {user && user.role === "admin" && (
            <Link href={"/admin"}>
              <section className="py-4 border-b border-b-slate-200 cursor-pointer">
                <div className="flex justify-start items-center gap-3 px-6">
                  <RiAdminLine
                    size={26}
                    className="text-black dark:text-slate-200"
                  />
                  <h1 className="text-black dark:text-slate-200 text-xl font-normal">
                    Admin Dashboard
                  </h1>
                </div>
              </section>
            </Link>
          )}

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <section className="py-4 border-b border-b-slate-200 cursor-pointer">
                <div className="flex justify-start items-center gap-3 px-6">
                  <RiLogoutCircleLine className="text-black dark:text-slate-200 text-2xl" />
                  <h1 className="text-black dark:text-slate-200 text-xl font-normal">
                    Logout
                  </h1>
                </div>
              </section>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white dark:bg-slate-800 text-black dark:text-slate-200">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-lg font-bold dark:text-white">Are you sure?</AlertDialogTitle>
                <AlertDialogDescription className="text-sm dark:text-gray-300">
                  Do you really want to log out?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="font-bold">Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={logoutHandler} className="font-bold bg-red-500 hover:bg-red-600">
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


          
        </div>

        <div className="w-[75%]">
          {tab === "My Account" && <UserInfo user={user} />}
          {data.data === null && tab === "Change Password" && (
            <UserPassword user={user} />
          )}
          {tab === "Enrolled Courses" && <EnrolledCourses user={user} />}
        </div>
      </div>
    </UseProtected>
  );
};

export default Page;
