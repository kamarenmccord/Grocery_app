
import { configureStore } from '@reduxjs/toolkit';
import theDefaultExport from "../features/reactSlice";
import basketSlice from '../features/basketSlice';

export default configureStore({
    reducer: {
        user: theDefaultExport,
        basket: basketSlice,
    },
})
