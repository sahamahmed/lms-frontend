import { get } from "http";
import { apiSlice } from "../api/apiSlice";


export const courseSlice = apiSlice.injectEndpoints({
    endpoints: (builder)=> ({
        createCourse: builder.mutation({
            query: (data) => ({
                url: 'create-course',
                method: 'POST',
                body: data,
                credentials: 'include' as const,
            })
        }),
        getAllCourses: builder.query({
            query: () => ({
                url: 'get-all-courses',
                method: 'GET',
                credentials: 'include' as const,
        })
        }),

        deleteCourse: builder.mutation({
            query: ({id}) => ({
                url: `delete-course/${id}`,
                method: 'DELETE',
                credentials: 'include' as const,
            })
        }),

        getFullCourse: builder.query({
            query: ({id}) => ({
                url: `get-course-content/${id}`,
                method: 'GET',
                credentials: 'include' as const,
            })
        }),

        editCourse: builder.mutation({
            query: ({id, data}) => ({
                url: `edit-course/${id}`,
                method: 'PUT',
                body: data,
                credentials: 'include' as const,
            })
        }),

        getCourses: builder.query({
            query: () => ({
                url: 'get-courses',
                method: 'GET',
                credentials: 'include' as const,
            })
        }),

        getMyCourses: builder.query({
            query: () => ({
                url: '/get-my-courses',
                method: 'GET',
                credentials: 'include' as const,
            })
        }),

        getCourseDetails: builder.query({
            query: (id) => ({
                url: `get-course/${id}`,
                method: 'GET',
                credentials: 'include' as const,
            })
        }),

        getCourseContent: builder.query({
            query: (id) => ({
                url: `get-content/${id}`,
                method: 'GET',
                credentials: 'include' as const,
            })
        }),

        addNewQuestion: builder.mutation({
            query: ({question , courseId, contentId}) => ({
                url: 'add-question',
                method: 'PUT',
                body: {question, courseId, contentId},
                credentials: 'include' as const,
            })
        }),
        addAnswerToQuestion: builder.mutation({
            query: ({ questionId, answer, courseId, contentId }) => ({
                url: 'add-answer',
                method: 'PUT',
                body: { questionId, answer, courseId, contentId },
                credentials: 'include' as const,
        }),
    }),

        addNewReview: builder.mutation({
            query: ({review, rating, courseId}) => ({
                url: `add-review/${courseId}`,
                method: 'PUT',
                body: {review, rating},
                credentials: 'include' as const,
            })
        }),

        addReviewReply: builder.mutation({
            query: ({ reviewId, comment, courseId }) => ({
                url: `add-reply`,
                method: 'PUT',
                body: { reviewId, comment, courseId },
                credentials: 'include' as const,
            })
        }),
    }),
})


export const { useGetMyCoursesQuery ,useAddReviewReplyMutation, useAddNewReviewMutation ,useAddAnswerToQuestionMutation, useAddNewQuestionMutation, useGetCourseContentQuery, useCreateCourseMutation , useGetCourseDetailsQuery, useGetAllCoursesQuery , useDeleteCourseMutation, useGetFullCourseQuery, useEditCourseMutation, useGetCoursesQuery} = courseSlice;