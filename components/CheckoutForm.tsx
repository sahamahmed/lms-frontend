import { useLoadUserQuery } from '@/redux/features/api/apiSlice'
import { useCreateOrderMutation } from '@/redux/features/orders/orderApi'
import { LinkAuthenticationElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { getSocket } from "@/utils/socket";
import Loader from './Loader'

type Props = {
    data: any,
    setOpen: any,
    user: any,
    refetch: any
}

const CheckoutForm = ({ data, setOpen, user, refetch }: Props) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = React.useState<string>('')
    const [isLoading, setIsLoading] = React.useState<boolean>(false)
    const [createOrder, { data: orderData, error: orderError }] = useCreateOrderMutation()
    const router = useRouter()
    const socket = getSocket();

    const handleSubmit = async (e: any) => {

        e.preventDefault()
        if (!stripe || !elements) {
            console.log('stripe or elements not loaded')
            return
        }
        setIsLoading(true)

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required"
        })

        if (error) {
            console.log(error)
            setMessage(error.message || 'An unknown error occurred')
            setIsLoading(false)
        } else if (paymentIntent && paymentIntent.status === 'succeeded') {
            createOrder({
                courseId: data.course._id,
                paymentInfo: paymentIntent,
            })
            setIsLoading(false)
            setMessage('')
            
        }
    }



    useEffect(() => {
        if (orderData) {
            setOpen(false)
            // Emit socket notification
            socket.emit("notification", {
                title: "Course Purchase",
                message: `You have a new order from ${data?.course?.name}`,
                userId: user._id
            });

            router.refresh()
            refetch()

        }
        if (orderError) {
            console.error('Order creation error:', orderError);
        }
    }, [orderData, orderError]);


    return (
        <form id="payment-form" onSubmit={handleSubmit}>
            <LinkAuthenticationElement id="link-authentication-element" />
            <PaymentElement id="payment-element" />

            {/* Customer Name */}

            <div className='mt-6 flex justify-center'>
                <button disabled={isLoading || !stripe || !elements} id="submit" className='w-[30%] bg-yellow-500 py-3 px-4 rounded-lg '>
                    <span id="button-text">
                        {isLoading ? <Loader size={20}/> : "Pay now"}
                    </span>
                </button>
            </div>
            {/* Show any error or success messages */}
            {message && <div id="payment-message">{message}</div>}
        </form>
    )
}

export default CheckoutForm
