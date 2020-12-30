
import { createSlice } from '@reduxjs/toolkit';

export const defaultSlice= createSlice({
    name: 'default',
    initalState:{
        user: null,
    },
    reducers:{
        login: (state, action)=>{
            state.user = action.payload
        },
        logout: (state)=>{
            state.user = null
        },
    }
})


export const { login, logout } = defaultSlice.actions;

export const selectDefault = state => state.default;

export default defaultSlice.reducers;
