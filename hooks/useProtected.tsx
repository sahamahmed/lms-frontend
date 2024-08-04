import React, { FC } from 'react'
import UserAuth from './userAuth'
import { redirect } from 'next/navigation'


interface Props {
    children: React.ReactNode
}

const useProtected: FC<Props> = ({children}) => {
    const isAuthenticated = UserAuth()

    return isAuthenticated ? children : redirect('/login')

}

export default useProtected