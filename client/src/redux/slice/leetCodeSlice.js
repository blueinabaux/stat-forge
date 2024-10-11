// redux/slice/leetCodeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  solvedProblems: 0,
  ranking: null,
  recentSubmissions: [],
};

const leetCodeSlice = createSlice({
  name: "leetCode",
  initialState,
  reducers: {
    setLeetCodeUser: (state, action) => {
      state.user = action.payload;
      state.solvedProblems = action.payload.totalSolved; // Assuming from API
      state.ranking = action.payload.rank; // Assuming from API
      state.recentSubmissions = action.payload.recentSubmissionList; // Assuming from API
    },
  },
});

export const { setLeetCodeUser } = leetCodeSlice.actions;
export default leetCodeSlice.reducer;
