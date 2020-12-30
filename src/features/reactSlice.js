
import { createSlice } from '@reduxjs/toolkit';

export const defaultSlice = createSlice({
    name: 'user',
    initialState:{
        user: null,
    },
    reducers:{
        login: (state, action)=>{
            console.log('login triggered');
            state.user = action.payload
        },
        logout: (state)=>{
            state.user = null
        },
    }
})


export const { login, logout } = defaultSlice.actions;

export const selectDefault = state => state.user.user;

export default defaultSlice.reducer;
