import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contest : []
}

const contestSlice = createSlice({
    name: "contest",
    initialState,
    reducers: {
        setContest : (state,action) => {
            state.contest = action.payload;
        }
    }
})


export const {setContest} = contestSlice.actions;

export default contestSlice.reducer;


