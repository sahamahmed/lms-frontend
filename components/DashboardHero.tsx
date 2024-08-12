import { User } from 'lucide-react'
import React from 'react'
import OrderAnalytics from './admin/OrderAnalytics'
import UserAnalytics from './admin/UserAnalytics'
import AllOrders from './admin/AllOrders'

type Props = {}

const DashboardHero = (props: Props) => {
  return (
    <div className='w-full space-y-4'>
      <h1 className='font-bold text-4xl dark:text-slate-100 text-slate-800'>Dashboard</h1>
      <div className='flex justify-start items-center  w-[95%] '>
        <div className=' w-full'>
          <UserAnalytics />
        </div>

        <div className="">
          <div className='bg-pink-400 h-32 w-full min-w-48 p-6 rounded-lg '>500 New Users</div> <br />
          <div className='bg-pink-400 h-32 w-full min-w-48 p-6 rounded-lg '>101 New Orders</div>
        </div>
      </div>

      <div className='flex justify-center items-center w-[95%]  h-fit'>
        <div className='w-full'>
          <OrderAnalytics />
        </div>
        <div className='w-full'>
          <h1 className='font-bold text-2xl dark:text-slate-100 text-slate-800'>Recent Orders</h1>

            <AllOrders />
        </div>
      </div>
    </div>
  )
}

export default DashboardHero