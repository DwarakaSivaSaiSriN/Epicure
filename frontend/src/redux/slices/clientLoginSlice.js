import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export let clientLoginThunk = createAsyncThunk('client login', async (clientCred, thunkApi) => {
    let res
    if (clientCred === 'client') {
        res = await axios.post('http://localhost:4000/client-api/login', clientCred)
    }
    if (clientCred === 'eatery') {
        res = await axios.post('http://localhost:4000/eatery-api/login', clientCred)
    }
    if (res.data.message === 'login success') {
        //store jwt token in local/session storage

        //localStorage.setItem()
        //localStorage.getItem()
        //localStorage.removeItem()
        sessionStorage.setItem('token', res.data.token)
        //sessionStorage.getItem()
        //sessionStorage.removeItem()
        return res.data
    } else {
        thunkApi.rejectWithValue(res.data.message)
    }
})

const clientLoginSlice = createSlice({
    name: 'client-login-slice',
    initialState: { isPending: false, currentClient: {}, errStatus: false, errMsg: "", loginStatus: false },
    reducers: {
        resetState: (state, payload) => {
            state.isPending = false
            state.currentClient = {}
            state.errMsg = ""
            state.errStatus = false
            state.loginStatus = false
        }

    },
    extraReducers: builder => builder
        .addCase(clientLoginThunk.pending, (state, action) => {
            state.isPending = true;
        })
        .addCase(clientLoginThunk.fulfilled, (state, action) => {
            state.isPending = false;
            state.errMsg = ""
            state.errStatus = false
            state.currentClient = action.payload
            state.loginStatus = true

        })
        .addCase(clientLoginThunk.rejected, (state, action) => {
            state.isPending = false;
            state.currentClient = {}
            state.errMsg = action.payload
            state.errStatus = true
            state.loginStatus = false
        })
})

//export the root reducers
export default clientLoginSlice

//export the action creator functions 
export const { resetState } = clientLoginSlice.actions