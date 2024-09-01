import React, { useEffect } from 'react';
import { useGetCourseDetailsQuery } from '@/redux/features/courses/courseApi';
import { useSelector } from 'react-redux';
import CourseContentList from './CourseContentList';
import CoursePlayer from './CoursePlayer';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import { useCreatePaymentIntentMutation, useGetStripePublishableKeyQuery } from '@/redux/features/orders/orderApi';
import {loadStripe} from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Rating } from '@mui/material';
import Ratings from './Ratings';

type Props = {
  id: string;
}

const CourseDetails = ({ id }: Props) => {
  const { data } = useGetCourseDetailsQuery(id);
  const { data: userData, refetch } = useLoadUserQuery(undefined, {refetchOnMountOrArgChange: true});
  const [open, setOpen] = React.useState(false);
  const { data: config} = useGetStripePublishableKeyQuery({})
  const [createPaymentIntent, {data: paymentIntentData}] = useCreatePaymentIntentMutation();
   const [stripePromise, setStripePromise] = React.useState<any>(null);
   const [clientSecret, setClientSecret] = React.useState<string>('');

  const discountPercent: number = data?.course?.estimatedPrice && data?.course?.price
    ? parseFloat((((data.course.estimatedPrice - data.course.price) / data.course.estimatedPrice) * 100).toFixed(0))
    : 0;

  const isPurchased = userData && userData?.user?.courses?.some((course: any) => course.courseId === id);


  useEffect(() => {
    if(config){
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }
    if(data){
      const amount = Math.round(parseFloat(data.course.price) * 100);
      createPaymentIntent({amount})
    }
  }, [config, data, createPaymentIntent])


  useEffect(() => {
    if(paymentIntentData){
      setClientSecret(paymentIntentData.client_secret)
    }
  }, [paymentIntentData])

  const handleOrder = (e: any) => {
    e.preventDefault();
    setOpen(true)
  }

  return (
    <>
      <div className='dark:text-white text-slate-900 flex items-start w-full h-full'>
        <div className='w-[75%] '>

          <div className="space-y-8 w-[80%]">
            <div>
              <h1 className='text-3xl font-bold'>{data?.course?.name}</h1>
              <div className='flex justify-between'>
                <div className='flex items-center space-x-2'>
                  <Ratings data={data} />
                  <span>{data?.course?.reviews.length} Reviews</span>
                </div>
                  <span>{data?.course?.purchased} Students</span>
              </div>
            </div>

            {/* What you'll learn Section */}
            <div className=''>
              <h2 className='text-2xl font-semibold'>What you will learn from this course?</h2>
              <ul className='mt-2 space-y-1'>
                {data?.course?.benefits?.map((item: any, index: number) => (
                  <li key={index} className='flex items-start space-x-2'>
                    <span>✔️</span>
                    <span>{item?.title || 'abc'}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Prerequisites Section */}
            <div className=''>
              <h2 className='text-2xl font-semibold'>What are the prerequisites for starting this course?</h2>
              <ul className='mt-2 space-y-1'>
                {data?.course?.prerequisites?.map((item: any, index: number) => (
                  <li key={index} className='flex items-start space-x-2'>
                    <span>✔️</span>
                    <span>{item.title || 'abc'}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h1 className='text-2xl font-semibold mb-6'>Course Overview</h1>
              <CourseContentList data={data?.course?.courseData} isDemo={true} />
            </div>

            <div>
              <h1 className='text-2xl font-semibold'>Course Details</h1>
              <p className='mt-2'>{data?.course?.description}</p>
            </div>
          </div>
        </div>

        <div className='w-[25%] flex flex-col justify-start gap-y-4'>
          <CoursePlayer videoUrl={data?.course?.demoUrl} title={data?.course?.name} />

          <div>
            {/* Price and Discount Section */}
            <div className='mt-4 h-full p-2'>
              <div className='text-3xl font-bold '>
                {data?.course?.price ? `$${data.course.price}` : 'Free'}
                {data?.course?.estimatedPrice && (
                  <span className='line-through text-gray-500 text-lg ml-2'>
                    ${data.course.estimatedPrice}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className='text-green-500 ml-2'>
                    {discountPercent}% Off
                  </span>
                )}
              </div>
              <div className='mt-4'>
                {isPurchased ? (
                  <Link href={`/course-access/${data?.course?._id}`} className=' bg-red-500 text-white py-2 px-6 rounded-full cursor-pointer'>
                    Enter Course
                  </Link>
                ) : (
                  <button onClick={handleOrder} className=' cursor-pointer bg-red-500 text-white py-2 px-6 rounded-full'>
                    {`Buy Now for $${data?.course?.price}`}
                  </button>
                )}
              </div>

            </div>
          </div>

          {/* Course Features */}
          <ul className='mt-6 text-gray-500 space-y-1'>
            <li>Source code included</li>
            <li>Full lifetime access</li>
            <li>Certificate of completion</li>
            <li>Premium Support</li>
          </ul>
        </div>

      </div>


      <div>
          {open && (
            <div className='w-full h-screen top-0 left-0 fixed flex items-center justify-center z-50 bg-slate-900'>
              <div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3'>
                <div className='w-full flex justify-end'>
                  <IoCloseOutline size={40} className='text-black cursor-pointer' onClick={() => setOpen(false)} />
                </div>
                <div className="w-full">
                  {
                    stripePromise && clientSecret && (
                      <Elements stripe={stripePromise} options={{clientSecret}}>
                        <CheckoutForm  data={data} setOpen={setOpen} user={userData.user} refetch={refetch}/>
                      </Elements>
                    )
                  }
                </div>
              </div>

            </div>
          )}
      </div>
    </>
  )
}

export default CourseDetails;
