import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    problems: [], // Initialize problems as an array
};

const problemsSlice = createSlice({
    name: "problems",
    initialState,
    reducers: {
        setProblems: (state, action) => {
            state.problems = action.payload; // Update problems in the state
        },
    },
});

export const { setProblems } = problemsSlice.actions;

export default problemsSlice.reducer;
