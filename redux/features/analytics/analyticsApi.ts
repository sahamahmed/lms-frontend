import { apiSlice } from "../api/apiSlice";



export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (buider) => ({
        getUserAnalytics: buider.query({
            query: () => ({
                url: 'get-user-analytics',
                method: 'GET',
                credentials: 'include' as const
            })
        }),

        getCourseAnalytics: buider.query({
            query: () => ({
                url: `get-course-analytics`,
                method: 'GET',
                credentials: 'include' as const
            })
        }),
        getOrderAnalytics: buider.query({
            query: () => ({
                url: `get-order-analytics`,
                method: 'GET',
                credentials: 'include' as const
            })
        }),
    })
})


export const { useGetUserAnalyticsQuery, useGetCourseAnalyticsQuery, useGetOrderAnalyticsQuery } = analyticsApi