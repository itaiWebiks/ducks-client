import { createSlice } from "@reduxjs/toolkit";

export interface Duck {
  id: number;
  name: string;
  color: string;
  longitude:number;
  latitude :number;
};

const initialState:Duck[] = [
  ]

export const ducksSlice = createSlice({
  name: "ducks",
  initialState,
  reducers: {
    add: (state: Duck[], action) => {
      state.push(action.payload);
    },
    addMulti:(state, action) => {
        state.push(...action.payload)
      },
  }
});
export const {add,addMulti} = ducksSlice.actions;
export default ducksSlice.reducer;
