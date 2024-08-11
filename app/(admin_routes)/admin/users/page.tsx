'use client'
import AllUsers from '@/components/admin/AllUsers'
import React from 'react'

const Page = () => {
    return (
        <div className='w-full min-h-screen'>
            <AllUsers type='users'/>
        </div>
    )
}

export default Page