'use client'
import { apiSlice } from './features/api/apiSlice'
import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
})

const initializeApp = async () => {

    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, {forceRefetch: true}))

}


initializeApp()

export default store