"use client";
import { useLogoutQuery } from "@/redux/features/auth/authApi";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";
import { VscAccount } from "react-icons/vsc";
import { SiCoursera } from "react-icons/si";
import { PiPasswordBold } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { User } from "lucide-react";
import UserInfo from "@/components/UserInfo";
import UserPassword from "@/components/userPassword";
import EnrolledCourses from "@/components/EnrolledCourses";
import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import UseProtected from "@/hooks/useProtected";
import { set } from "zod";

const Page = () => {
  const { user } = useSelector((state: any) => state.auth);
  console.log(user)
  const [tab, setTab] = React.useState("My Account");
  const [logoutState, setLogoutState] = React.useState(false);
  const data = useSession();
  console.log(data);
  const router = useRouter()

  const sections = [
    {
      icon: <VscAccount className="text-white text-2xl" />,
      label: "My Account",
    },
    ...(data.data === null
      ? [
          {
            icon: <PiPasswordBold className="text-white text-2xl" />,
            label: "Change Password",
          },
        ]
      : []),
    {
      icon: <SiCoursera className="text-white text-2xl" />,
      label: "Enrolled Courses",
    },
    {
      icon: <RiLogoutCircleLine className="text-white text-2xl" />,
      label: "Logout",
    },
  ];

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

    // router.push('/')
  };

  const handleTabClick = (label: string) => {
    if (label === "Logout") {
      logoutHandler();
      setTab(label);
    } else {
      setTab(label);
    }
  };

  return (
    <>
    <UseProtected>
      <div className="px-28 py-5 mx-auto w-full flex gap-10 ">
        <div className="bg-[#4A1F64] min-h-[30rem] w-[25%] rounded-lg flex flex-col pb-4">
          {sections.map((section, index) => (
            <section
              key={index}
              className={`py-4 border-b border-b-slate-200 cursor-pointer ${
                tab === "My Account" ? "rounded-tr-lg rounded-tl-lg" : ""
              } ${tab === section.label ? "bg-[#685275]" : ""}`}
              onClick={() => handleTabClick(section.label)}
            >
              <div className="flex justify-start items-center gap-3 px-6">
                {section.icon}
                <h1 className="text-white text-xl font-normal">
                  {section.label}
                </h1>
              </div>
            </section>
          ))}
          {user && user.role === "admin" && (
            <Link href={"/admin"}>
              <section
                className={`py-4 border-b border-b-slate-200 cursor-pointer `}
              >
                <div className="flex justify-start items-center gap-3 px-6">
                    <RiAdminLine size={26} className="text-white"/>
                  <h1 className="text-white text-xl font-normal">
                    {" "}
                    Admin Dashboard
                  </h1>
                </div>
              </section>
            </Link>
          )}
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
    </>
  );
};

export default Page;
