"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Image from "next/image"
import FormSchema from "@/schemas/pin.schema"
import { useSelector } from "react-redux"
import { useActivationMutation } from "@/redux/features/auth/authApi"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"



export default function Verification({onClose}: {onClose: () => void}) {
    const [activation, {isSuccess, error, data}] = useActivationMutation()
    const token = useSelector((state: any) => state.auth.token)
    const router = useRouter()

    useEffect(()=> {
        if(isSuccess){
            toast.success("Account activated successfully")
            onClose()
            router.push("/login")
        }
        if(error){
            console.log(error)
        }

    }, [isSuccess, error,data])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        await activation({
            activationToken: token,
            activationCode: data.pin
        })
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div className="p-10 space-y-6 bg-[#6c3faa] w-[90%] md:w-[25%] h-fit flex flex-col items-center justify-center rounded-3xl shadow-2xl shadow-black transform-gpu transition-transform duration-300 hover:scale-105">
                <h1 className="text-white text-3xl font-semibold mb-4">OTP</h1>
                <Image src="/otp.png" width={100} height={100} alt="OTP Image" className="h-32 w-32 mb-4" />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full space-y-4">
                        <FormField
                            control={form.control}
                            name="pin"
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-col items-center justify-center">
                                    <FormControl>
                                        <InputOTP maxLength={4} {...field} className="">
                                            <InputOTPGroup>
                                                <InputOTPSlot index={0} />
                                                <InputOTPSlot index={1} />
                                                <InputOTPSlot index={2} />
                                                <InputOTPSlot index={3} />
                                            </InputOTPGroup>
                                        </InputOTP>
                                    </FormControl>
                                    <FormDescription className="text-purple-200 text-center mt-2">
                                        Please enter the verification code sent to your email.
                                    </FormDescription>
                                    <FormMessage className="" />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="py-2 px-4 bg-gradient-to-br from-[#5B2C78] to-[#9747FF] text-white rounded-lg shadow-md">
                            Submit
                        </Button>
                    </form>
                </Form>
            </div>
        </div>


    )
}
