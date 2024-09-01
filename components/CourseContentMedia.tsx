import React, { useEffect } from 'react'
import CoursePlayer from './CoursePlayer'
import { AiFillStar, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineStar } from 'react-icons/ai'
import Image from 'next/image'
import { toast } from 'sonner'
import { useAddAnswerToQuestionMutation, useAddNewQuestionMutation, useAddNewReviewMutation, useAddReviewReplyMutation, useGetCourseDetailsQuery } from '@/redux/features/courses/courseApi'
import CommentReply from './CommentReply'
import { format } from 'timeago.js'
import { MdVerified } from 'react-icons/md'
import { getSocket } from '@/utils/socket'

type Props = {
    data: any
    id: string
    activeVideo?: number
    setActiveVideo?: (activeVideo: number) => void
    user?: any
    refetch?: any
}

const CourseContentMedia = ({ data, id, activeVideo, setActiveVideo, user , refetch}: Props) => {
    // console.log(data)
    // 665c56e1bdba383abc04c6c2
    // console.log(user)
    const [activeBar, setActiveBar] = React.useState<number>(0)
    const [question, setquestion] = React.useState<string>('')
    const [rating, setRating] = React.useState<number>(0)
    const [review, setReview] = React.useState<string>('')
    const [reply, setReply] = React.useState<string>('')
    const [questionId, setquestionId] = React.useState<string>('')
    const [reviewId, setReviewId] = React.useState<string>('')
    const [answer, setAnswer] = React.useState<string>('')
    const { data: courseData, refetch:courseRefetch} = useGetCourseDetailsQuery(id, {refetchOnMountOrArgChange: true})
    const [addNewQuestion, {isSuccess, error, isLoading}] = useAddNewQuestionMutation()
    const [addNewReview, { isSuccess: ReviewSuccess, error:ReviewError, isLoading: ReviewLoading }] = useAddNewReviewMutation()
    const [addAnswerToQuestion, {isSuccess:AnswerSuccess, error:AnswerError, isLoading:AnswerLoading}] = useAddAnswerToQuestionMutation()
    const [reviewReply, setReviewReply] = React.useState(false)
    const [addReviewReply, {isSuccess:ReviewReplySuccess, error:ReviewReplyError, }] = useAddReviewReplyMutation()

    const isReviewExists = courseData?.course?.reviews?.find((review: any) => review.user._id === user?._id)

    const socket = getSocket()

    const handleSubmit = () => {
        if (question.length < 1) {
            toast.error('Question cannot be empty');
        } else if (activeVideo !== undefined) {  
            addNewQuestion({ question, courseId: id, contentId: data[activeVideo]?._id });
        }
    }

    const handleAnswerSubmit = () => {
        if (answer.length < 1) {
            toast.error('Answer cannot be empty');
        } else if (activeVideo !== undefined) {  // Check if activeVideo is defined
            addAnswerToQuestion({ questionId, answer, courseId: id, contentId: data[activeVideo]?._id });
        }
    }

    function handleReviewSubmit() {
        if (rating === 0) {
            toast.error('Please give a rating')
        } else if (review.length < 1) {
            toast.error('Review cannot be empty')
        } else {
            addNewReview({review, rating, courseId: id})
        }
    }


    function handleReviewReply(reviewId: string) {
        if (reply.length < 1) {
            toast.error('Reply cannot be empty')
        } else {
            addReviewReply({ reviewId:reviewId, comment:reply, courseId:id })

            console.log('DONE')
        }
    }


    useEffect(() => {
        if (isSuccess) {
            setquestion('')
            toast.success('Question submitted successfully')
            refetch()
            socket.emit("notification", {
                title: "New Question",
                message: `You have a new question from ${data[activeVideo]?.title}`,
                userId: user._id
            });
        } else if (error) {
            toast.error('Failed to submit question')
        }
        if (AnswerSuccess) {
            setAnswer('')
            toast.success('Answer submitted successfully')
            refetch()
            if (user.role !== 'admin') {
                socket.emit("notification", {
                    title: "New Reply Recieved",
                    message: `You have a new question reply in ${data[activeVideo]?.title}`,
                    userId: user._id
                });
            }
        } else if (AnswerError) {
            toast.error('Failed to submit answer')
        } 
        
        if (ReviewSuccess) {
            setReview('')
            setRating(0)
            toast.success('Review submitted successfully')
            courseRefetch()      
            socket.emit("notification", {
                title: "New Review",
                message: `You have a new review from ${data[activeVideo]?.title}`,
                userId: user._id
            });
        } else if (ReviewError) {
            toast.error('Failed to submit review')
        }

        if (ReviewReplySuccess) {
            setReply('')
            toast.success('Reply submitted successfully')
            courseRefetch()
        } else if (ReviewReplyError) {
            toast.error('Failed to submit reply')
        }
    }, [isSuccess, error, AnswerSuccess, AnswerError, ReviewSuccess, ReviewError, ReviewReplySuccess, ReviewReplyError])



    
    return (
        activeVideo !== undefined ? (
            <div className='w-[95%] py-4 m-auto'>
                <CoursePlayer
                    title={data[activeVideo]?.title || ''}
                    videoUrl={data[activeVideo]?.videoUrl || ''}
                    classname='w-[100%] h-[400px]'
                />
                <div className='w-full flex justify-between items-center my-3 gap-12'>
                    <div
                        className={`p-3 bg-blue-500 rounded-full flex font-semibold text-lg justify-center items-center min-h-10 !py-[unset] ${activeVideo === 0 ? ' cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{ flexBasis: '0', flexGrow: '1' }} 
                    onClick={() => {
                        if (activeVideo !== undefined && activeVideo > 0 && setActiveVideo) {
                            setActiveVideo(activeVideo - 1)
                        }
                    }}
    >
                    <AiOutlineArrowLeft size={20} className='mr-2 font-bold' />
                    <span>Previous Lesson</span>
                </div>

                <div
                    className={`p-3 bg-blue-500 rounded-full flex font-semibold text-lg justify-center items-center min-h-10 !py-[unset] ${data.length - 1 === activeVideo ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    style={{ flexBasis: '0', flexGrow: '1' }}  
                onClick={() => {
                    if (activeVideo !== undefined && data.length - 1 !== activeVideo && setActiveVideo) {
                        setActiveVideo(activeVideo + 1)
                    }
                }}
    >
                <span>Next Lesson</span>
                <AiOutlineArrowRight size={20} className='ml-2 font-bold' />
            </div>
</div >


                <h1 className='text-xl font-bold'> {data[activeVideo]?.title} </h1>
                <br />

                <div className='w-full flex items-center justify-between bg-slate-500 rounded'>
                    {['Overview', 'Resources', 'Q&A', 'Reviews'].map((item, index) => (
                        <h1
                            key={index}
                            className={`cursor-pointer font-semibold p-4 ${activeBar === index ? 'text-red-500 font-bold text-xl' : 'text-white'}`}
                            onClick={() => setActiveBar(index)}
                        >
                            {item}
                        </h1>
                    ))}
                </div>
                <br />

                {activeBar === 0 && (
                    <div className='w-full'>
                        <p>{data[activeVideo]?.description}</p>
                    </div>
                )}

                {activeBar === 1 && (
                    <div className='w-full'>
                        {data[activeVideo]?.links?.map((link: any, index: number) => (
                            <div className="mb-5" key={index}>
                                <h1>{link.title && link.title + " :"}</h1>
                                <a href={link.url} target="_blank" rel="noreferrer" className='text-blue-500 '>{link.url}</a>
                            </div>
                        ))}
                    </div>
                )}

                {activeBar === 2 && (
                    <div>
                        <div className='w-full flex gap-4'>
                            <Image
                                src={user?.avatar?.url || "/user.png"}
                                alt="avatar"
                                width={50}
                                height={50}
                                className="rounded-full border border-purple-950 shadow-md shadow-black bg-cover bg-center w-16 h-16"
                            />

                            <textarea
                                className='w-full p-2 rounded border border-gray-300 bg-transparent'
                                placeholder='Ask a question'
                                value={question}
                                onChange={(e) => setquestion(e.target.value)}
                            />
                        </div>

                        <div className={`flex justify-end mt-4 ${isLoading ? 'cursor-not-allowed' : ''}`}  onClick={isLoading? ()=>{}: handleSubmit}>
                            <button className='px-4 py-2 rounded-full bg-red-500 text-white'>Submit</button>
                        </div>

                        {/* Question reply */}
                        <div>
                            <CommentReply
                                user={user}
                                data={data}
                                activeVideo={activeVideo}
                                answer={answer}
                                setAnswer={setAnswer}
                                handleAnswerSubmit={handleAnswerSubmit}
                                setquestionId={setquestionId}
                            />
                        </div>
                    </div>
                )}

                {activeBar === 3 && (
                    <div className='w-full'>
                        {!isReviewExists && (
                            <>
                                <div className='flex gap-4 items-center'>
                                    <Image
                                        src={user?.avatar?.url || "/user.png"}
                                        alt="avatar"
                                        width={50}
                                        height={50}
                                        className="rounded-full border border-purple-950 shadow-md shadow-black bg-cover bg-center w-16 h-16"
                                    />

                                    <div className="w-full">
                                        <h1 className='text-lg font-semibold'>Give a rating</h1>
                                        <div className='flex  w-full pb-3'>
                                            {[1, 2, 3, 4, 5].map((item, index) => (
                                                rating >= item ? (
                                                    <AiFillStar
                                                        size={30}
                                                        key={index}
                                                        onClick={() => setRating(item)}
                                                        className='cursor-pointer text-yellow-500'
                                                    />
                                                ) : (
                                                    <AiOutlineStar
                                                        size={30}
                                                        key={index}
                                                        onClick={() => setRating(item)}
                                                        className='cursor-pointer text-yellow-500'
                                                    />
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <textarea
                                    className='w-full p-2 rounded border border-gray-300 bg-transparent mt-2'
                                    placeholder='Write a review'
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    />

                                <div className='flex justify-end mt-4'>
                                    <button className='px-4 py-2 rounded-full bg-red-500 text-white' onClick={ReviewLoading ? () => { } : handleReviewSubmit}>Submit</button>
                                </div>
                                
                            </>

                        )}
                        <br />
                        <div className='text-slate-400 dark:text-slate-600 h-1 w-full'></div>
                        <div className='w-full'>
                            <h1 className='text-lg font-semibold'>Reviews</h1>
                            {courseData?.course.reviews?.map((review: any, index: number) => (
                                <div key={index} className='w-full my-4'>
                                    <div className='flex items-start gap-4'>
                                        <Image
                                            src={review?.user?.avatar?.url || "/user.png"}
                                            alt="avatar"
                                            width={30}
                                            height={30}
                                            className="rounded-full mt-2"
                                        />
                                        <div>
                                            <h1 className='text-lg font-semibold'>{review.user.name}</h1>
                                            <div className='flex gap-2'>
                                                {[1, 2, 3, 4, 5].map((item, index) => (
                                                    review.rating >= item ? (
                                                        <AiFillStar size={20} key={index} className='text-yellow-500' />
                                                    ) : (
                                                        <AiOutlineStar size={20} key={index} className='text-yellow-500' />
                                                    )
                                                ))}
                                            </div>
                                            <p className='mt-2'>{review.comment}</p>
                                            <small className='text-gray-500 '>{format(review.createdAt)}.</small>
                                        </div>
                                    </div>
                                   

                                    <div>
                                        {
                                            user && user.role === 'admin' && (
                                                <button className='px-4 py-2 bg-transparent' onClick={() => {
                                                    setReviewReply(!reviewReply)
                                                    setReviewId(review._id)
                                                }}>
                                                    {reviewReply && reviewId == review._id ? 'Hide Reply' : 'Add Reply'}
                                                </button>
                                            )
                                        }
                                    </div>

                                    {
                                        reviewId === review._id &&
                                        reviewReply && (
                                            <div className="w-full flex relative border-b border-slate-700 dark:border-slate-300">
                                                <input type="text"
                                                    placeholder='Enter your reply'
                                                    value={reply}
                                                    onChange={(e) => setReply(e.target.value)}
                                                    className='block  outline-none p-2 bg-transparent w-[95%]'
                                                />
                                                <button type='submit' onClick={() => handleReviewReply(review._id)} >
                                                    Submit
                                                </button>
                                            </div>
                                        )
                                    }

                                    {  
                                        review.commentReplies.map((reply: any, index: number) => (
                                            <div key={index} className='w-full flex mt-3 items-start ml-10'>
                                                <Image
                                                    src={reply?.user?.avatar?.url || "/user.png"}
                                                    alt="avatar"
                                                    width={30}
                                                    height={30}
                                                    className="rounded-full"
                                                />
                                                <div className='pl-2'>
                                                    <div className='flex justify-start items-center gap-3'>
                                                        <h5 className='font-semibold'>{reply.user.name}</h5>
                                                        {reply.user.role === 'admin' && <MdVerified size={20} className='text-blue-500' />}
                                                    </div>
                                                    <p className='text-sm'>{reply.comment}</p>
                                                    <small className='text-gray-500'>{format(reply.createdAt)}.</small>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            ))}
                        </div>

                       
                    </div>
                )}
            </div>
        ) : null
    )
}

export default CourseContentMedia
