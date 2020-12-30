import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
    name: 'basket',
    initialState:{
        basket: [],
    },
    reducers:{
        ADD_TO_BASKET: (state, action)=>{
            console.log('adding item')
        },
        REMOVE_FROM_BASKET: (state, action)=>{
            console.log('removing item')
        },
        EMPTY_BASKET: (state, action)=>{
            state.basket = []
        }
    }
})

export const { ADD_TO_BASKET, REMOVE_FROM_BASKET, EMPTY_BASKET } = basketSlice.actions;
export const selectBasket = state => state.basket.basket;

export default basketSlice.reducer;
