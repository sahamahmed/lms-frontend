import { apiSlice } from "../api/apiSlice";


const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: (avatar) => ({
                url: 'update-user-avatar',
                method: 'PUT',
                body: { avatar },
                credentials: 'include' as const,
            })
        }),

        updateInfo: builder.mutation({
            query: (name) => ({
                url: 'update-user-info',
                method: 'PUT',
                body: { name },
                credentials: 'include' as const,
            })
        }),

        updatePassword: builder.mutation({
            query: ({currentPassword, newPassword}) => ({
                url: 'update-user-password',
                method: 'PUT',
                body: { currentPassword, newPassword },
                credentials: 'include' as const,
            })
        })

    })
})


export const {useUpdateAvatarMutation, useUpdateInfoMutation, useUpdatePasswordMutation} = userApi