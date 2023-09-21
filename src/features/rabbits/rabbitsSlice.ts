import { createSlice } from "@reduxjs/toolkit";

export interface Rabbit {
  id: number;
  name: string;
  color: string;
  earsLength:number;
};

const initialState:Rabbit[] = [
  ]

export const rabbitsSlice = createSlice({
  name: "rabbits",
  initialState,
  reducers: {
    add: (state: Rabbit[], action) => {
      state.push(action.payload);
    },
    addMulti:(state, action) => {
        state.push(...action.payload)
      },
  }
});
export const {add,addMulti} = rabbitsSlice.actions;
export default rabbitsSlice.reducer;
