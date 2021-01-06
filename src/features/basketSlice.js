import { createSlice } from '@reduxjs/toolkit';

export const basketSlice = createSlice({
    name: 'basket',
    initialState:{
        basket: [],
    },
    reducers:{
        ADD_TO_BASKET: (state, action)=>{
            state.basket = [...state.basket, action.payload]
            console.log(state.basket);
        },
        REMOVE_FROM_BASKET: (state, action)=>{
            let newBasket = [...state.basket];
            const index = state.basket.findIndex((basketItem)=> basketItem.id === action.id);

            if (index >= 0){
                newBasket.splice(index, 1);
            } else {
                console.warn(
                    `cannot remove product with id ${action.id}`
                )
            }

            state.basket = newBasket
        },
        EMPTY_BASKET: (state, action)=>{
            state.basket = []
        }
    }
})

export const { ADD_TO_BASKET, REMOVE_FROM_BASKET, EMPTY_BASKET } = basketSlice.actions;
export const selectBasket = state => state.basket.basket;

export default basketSlice.reducer;
