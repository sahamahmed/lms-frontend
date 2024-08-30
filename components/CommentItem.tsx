import Image from 'next/image'
import React from 'react'
import { BiMessage } from 'react-icons/bi'
import { format } from 'timeago.js'
import { MdVerified } from "react-icons/md";


const CommentItem = ({ data, activeVideo, item, answer, setAnswer, handleAnswerSubmit, setquestionId }: any) => {
    const [replyActive, setReplyActive] = React.useState<boolean>(false)
    return (
        <>
            <div className='my-6'>
                <div className='w-full flex'>
                    <div>
                        <Image src={item.user.avatar ? item.user.avatar.url : '/user.png'} alt='avatar' width={30} height={30} className='rounded-full' />
                    </div>
                    <div className='pl-2'>
                        <div className='flex justify-start items-center gap-3 font-semibold'>
                            <h5 >{item.user.name}</h5>
                        </div>
                        <p className='text-sm'>{item.question}</p>
                        <small className='text-gray-500'>{format(item.createdAt)}.</small>
                    </div>
                </div>
                <div className='w-full flex '>
                    <span className='cursor-pointer mr-2' onClick={() => {
                        setquestionId(item._id)
                        setReplyActive( prev => !prev)
                    }}>
                        {
                            !replyActive ? item?.questionReplies?.length !== 0 ? 'All replies' : 'Add Reply' : 'Hide Replies'
                        }
                    </span>
                    <BiMessage size={20} className='cursor-pointer' />
                    <span className='pl-1 mt-[-4px] cursor-pointer'>
                        {item?.questionReplies.length}
                    </span>
                </div>
                {
                    replyActive && (
                        <>
                            {
                                item?.questionReplies.map((reply: any, index: number) => (
                                    <div key={index} className='w-full flex mt-2 ml-10'>
                                        <div>
                                            <Image src={item.user.avatar ? item.user.avatar.url : '/user.png'} alt='avatar' width={30} height={30} className='rounded-full' />
                                        </div>
                                        <div className='pl-2'>
                                            <div className='flex justify-start items-center gap-3'>
                                                <h5 className='font-semibold'>{reply.user.name}</h5>
                                                {reply.user.role === 'admin' && <MdVerified size={20} className='text-blue-500' />}
                                            </div>
                                            <p className='text-sm'>{reply.answer}</p>
                                            <small className='text-gray-500'>{format(reply.createdAt)}.</small>
                                        </div>
                                    </div>
                                ))}
                            <div className="w-full flex relative border-b border-slate-700 dark:border-slate-300">
                                <input type="text"
                                    placeholder='Enter your answer'
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    className='block  outline-none p-2 bg-transparent w-[95%]'
                                />
                                <button type='submit' onClick={handleAnswerSubmit}>
                                    Submit
                                </button>
                            </div>
                        </>
                    )
                }
            </div>
        </>
    )
}

export default CommentItem