import { configureStore } from '@reduxjs/toolkit'
import clientLoginReducer from './slices/clientLoginSlice'


export let reduxStore = configureStore({
    reducer: {
        clientLogin: clientLoginReducer
    }
})