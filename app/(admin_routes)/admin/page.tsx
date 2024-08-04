'use client'
import AdminSideBar from '@/components/AdminSideBar'
import DashboardHero from '@/components/DashboardHero'
import AdminProtected from '@/hooks/adminProtected'
import React from 'react'

const Page = () => {
  return (
    <div>
            <AdminSideBar />
            <DashboardHero />
            
    </div>
  )
}

export default Page