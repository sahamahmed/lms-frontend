import { User } from "lucide-react";
import React from "react";
import OrderAnalytics from "./admin/OrderAnalytics";
import UserAnalytics from "./admin/UserAnalytics";
import AllOrders from "./admin/AllOrders";
import { HiMiniUserGroup } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";
import CourseAnalytics from "./admin/CourseAnalytics";

type Props = {};

const DashboardHero = (props: Props) => {
  return (
    <>
      <h1 className="font-bold text-4xl dark:text-slate-100 text-slate-800 mb-4">
        Dashboard
      </h1>
      <div className=" gap-4 grid grid-cols-2 lg:grid-cols-4 pr-4 pb-4 text-center">
        <div className="border border-purple-200 h-32 w-full min-w-20 rounded-xl flex flex-col justify-center items-center py-2 hover:bg-gradient-to-b from-transparent text-slate-800 to-purple-300 hover:text-white duration-2000 transition-all dark:text-slate-100 dark:hover:to-purple-950 dark:border-purple-950">
          <HiMiniUserGroup
            className="p-2 bg-blue-200 text-blue-900 rounded-full"
            size={40}
          />
          <h1 className="text-2xl font-semibold my-2">101 k</h1>
          <p>New Users</p>
        </div>
        <div className="border border-purple-200 h-32 w-full min-w-20 rounded-xl flex flex-col justify-center items-center py-2 hover:bg-gradient-to-b from-transparent text-slate-800 to-purple-300 hover:text-white duration-2000 transition-all dark:text-slate-100 dark:hover:to-purple-950 dark:border-purple-950">
          <TiShoppingCart
            className="p-2 bg-green-200 text-green-900 rounded-full"
            size={40}
          />
          <h1 className="text-2xl font-semibold my-2">101 k</h1>
          <p>New Orders</p>
        </div>
        <div className="border border-purple-200 h-32 w-full min-w-20 rounded-xl flex flex-col justify-center items-center py-2 hover:bg-gradient-to-b from-transparent text-slate-800 to-purple-300 hover:text-white duration-2000 transition-all dark:text-slate-100 dark:hover:to-purple-950  dark:border-purple-950">
          <img
            src="Course.png"
            className="p-2  h-[40px] bg-red-200 rounded-full"
          />
          <h1 className="text-2xl font-semibold my-2">101 k</h1>
          <p>Total Courses</p>
        </div>
        <div className="border border-purple-200 h-32 w-full min-w-20 rounded-xl flex flex-col justify-center items-center py-2 hover:bg-gradient-to-b from-transparent text-slate-800 to-purple-300 hover:text-white duration-2000 transition-all dark:text-slate-100 dark:hover:to-purple-950 dark:border-purple-950">
          <img
            src="/Student.png"
            className="p-2 bg-purple-200 h-[40px] rounded-full"
          />
          <h1 className="text-2xl font-semibold my-2">101 k</h1>
          <p>Enrolled Students</p>
        </div>
      </div>
      <div className="w-full space-y-4">
        <div className="flex justify-start items-center  w-[95%] ">
          <div className=" w-full">
            <UserAnalytics />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center w-[95%] gap-4  h-fit">
          <div className="w-full">
            <OrderAnalytics />
          </div>
          <div className="w-full">
            <h1 className="font-bold text-2xl dark:text-slate-100 text-slate-800">
              Recent Orders
            </h1>

            <AllOrders />
          </div>
        </div>

        <div className="flex justify-start items-center  w-[95%] ">
          <div className=" w-full">
            <CourseAnalytics />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHero;
