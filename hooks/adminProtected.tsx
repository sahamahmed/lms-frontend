import React, { FC } from 'react'
import UserAuth from './userAuth'
import { redirect } from 'next/navigation'
import { useSelector } from 'react-redux'


interface Props {
    children: React.ReactNode
}

const AdminProtected: FC<Props> = ({ children }) => {
    const { user } = useSelector((state: any) => state.auth)

    if (user ) {
        const isAdmin = user.role === 'admin'
        return isAdmin ? children : redirect('/')

    }



}

export default AdminProtected