import { configureStore } from "@reduxjs/toolkit";
import ducksReducer from '../features/ducks/ducksSlice';
import rabbitReducer from "../features/rabbits/rabbitsSlice";
export const store=configureStore({
    reducer:{
        ducks:ducksReducer,
        rabbits:rabbitReducer
    }
})
export type RootState = ReturnType<typeof store.getState>