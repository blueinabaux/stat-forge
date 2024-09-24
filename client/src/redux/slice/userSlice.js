import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {},
    contest: {}
};


const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload; 
        },

        setContest: (state, action) => {
            state.contest = action.payload; 
        }
    },

});


export const { setUser,setContest } = userSlice.actions;
export default userSlice.reducer;




