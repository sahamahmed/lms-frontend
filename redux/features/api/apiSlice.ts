import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { updateToken, updateUser, userLogin } from '../auth/authSlice'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery:fetchBaseQuery({baseUrl: process.env.NEXT_PUBLIC_SERVER_URI}),
    endpoints: (builder)=> ({
        refreshToken: builder.query({
            query: (data)=>({
                url: 'refresh',
                method: 'GET',
                credentials: 'include' as const
            }),
              async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateToken({
            token: result.data.accessToken,
          }))
        } catch (error) {
          console.error("Error during registration:", error);
        }
      }
        }),


        loadUser: builder.query({
            query:(data) => ({
                url: 'me',
                method: 'GET',
                credentials: 'include' as const
            }),
              async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(updateUser({
            user: result.data.user,
          }))
        } catch (error) {
          console.error("Error during registration:", error);
        }
      }
        })

    })
})



export const {useRefreshTokenQuery, useLoadUserQuery} = apiSlice