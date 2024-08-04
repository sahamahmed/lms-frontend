import { apiSlice } from "../api/apiSlice";
import { userLogin, userLogout, userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {

};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: 'register',
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userRegistration({
            token: result.data.activationToken,
          }));
        } catch (error) {
          console.error("Error during registration:", error);
        }
      },
    }),

    
    
    activation: builder.mutation({
        query: ({activationToken, activationCode}) =>({
            url: 'activate',
            method: 'POST',
            body: {activationToken, activationCode},
        })
    }),

    login: builder.mutation({
      query: ({email, password}) => ({
        url: 'login',
        method: 'POST',
        body: {email, password},
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogin({
            token: result.data.accessToken,
            user: result.data.user,
          }))
        } catch (error) {
          console.error("Error during registration:", error);
        }
      }
    }),

    socialLogin: builder.mutation({
      query: ({ email, name, avatar }) => ({
        url: 'social-auth',
        method: 'POST',
        body: { email, name, avatar },
        credentials: 'include',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLogin({
            token: result.data.accessToken,
            user: result.data.user,
          }))
        } catch (error) {
          console.error("Error during registration:", error);
        }
      }
    }),

    logout: builder.query({
      query: () => ({
        url: 'logout',
        method: 'GET',
        credentials: "include" as const
    }),
    async onQueryStarted(arg, {queryFulfilled, dispatch}) {
      try {
        await queryFulfilled;
        dispatch(userLogout());
      } catch (error) {
        console.error("Error during logout:", error);
      }
    }
  }),

}),
});

export const { useRegisterMutation, useActivationMutation , useLoginMutation, useSocialLoginMutation, useLogoutQuery} = authApi;
