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
        }),

        getAllUsers: builder.query({
            query: () => ({
                url: 'get-all-users',
                method: 'GET',
                credentials: 'include' as const,
            })
        }),

        updateUserRole: builder.mutation({
            query: ({id, role}) => ({
                url: 'update-user-role',
                method: 'PUT',
                body: { id, role },
                credentials: 'include' as const,
            })
        }),

        deleteUser: builder.mutation({
            query: ({id}) => ({
                url: `delete-user/${id}`,
                method: 'DELETE',
                credentials: 'include' as const,
            })
        }),

    })
})


export const {useUpdateAvatarMutation, useUpdateInfoMutation, useUpdatePasswordMutation, useGetAllUsersQuery, useUpdateUserRoleMutation, useDeleteUserMutation} = userApi