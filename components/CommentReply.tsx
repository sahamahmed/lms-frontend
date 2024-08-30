import React from 'react'
import CommentItem from './CommentItem'

type Props = {
    user: any
    data: any
    activeVideo: number
    answer: string
    setAnswer: (answer: string) => void
    handleAnswerSubmit: () => void
    setquestionId: (questionId: string) => void
}

const CommentReply = ({user, data, activeVideo, answer, setAnswer, handleAnswerSubmit, setquestionId}: Props) => {
  return (
    <div className='w-full my-4'>
        {
          data[activeVideo].questions.map((question: any, index: number) => (
            <CommentItem 
              key={index}
              user={user}
              data={data}
              activeVideo={activeVideo}
              index={index}
              item={question}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              setquestionId={setquestionId}
            />
          ))
        }
    </div>
  )
}

export default CommentReply