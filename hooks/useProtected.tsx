import React, { FC } from 'react'
import UserAuth from './userAuth'
import { redirect } from 'next/navigation'


interface Props {
    children: React.ReactNode
}

const UseProtected: FC<Props> = ({children}) => {
    const isAuthenticated = UserAuth()

    return isAuthenticated ? children : redirect('/login')

}

export default UseProtected