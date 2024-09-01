import { apiSlice } from "../api/apiSlice";


export const orderApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: 'get-all-orders',
                method: 'GET',
                credentials: 'include' as const,
            })
        }), 

        getStripePublishableKey: builder.query({
            query: () => ({
                url: '/payment/stripepublishablekey',
                method: 'GET',
                credentials: 'include' as const,
            })
        }),

        createPaymentIntent: builder.mutation({
            query: ({amount}) => ({
                url: '/payment',
                method: 'POST',
                body: {amount},
                credentials: 'include' as const,
            })
        }),

        createOrder: builder.mutation({
            query: ({ courseId, paymentInfo }) => ({
                url: 'create-order',
                method: 'POST',
                body: {courseId, paymentInfo},
                credentials: 'include' as const,
            })
        }),
        
    }),
})

export const { useGetAllOrdersQuery , useCreatePaymentIntentMutation , useGetStripePublishableKeyQuery, useCreateOrderMutation } = orderApi