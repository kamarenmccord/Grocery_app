
import { configureStore } from '@reduxjs/toolkit';
import theDefaultExport from "../features/reactSlice";

export default configureStore({
    reducer: {
        user: theDefaultExport,
    },
})
