import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  rank: null,
  rating: null,
  stars: null, // Include stars if it's used elsewhere
};

export const codeChefSlice = createSlice({
  name: "codeChef",
  initialState,
  reducers: {
    setCodeChefUser: (state, action) => {
      state.user = action.payload.user;
      state.rank = action.payload.rank;
      state.rating = action.payload.rating;
      state.stars = action.payload.stars; // Include stars in the action payload
    },
    clearCodeChefUser: (state) => {
      state.user = null;
      state.rank = null;
      state.rating = null;
      state.stars = null; // Clear stars as well
      
    },
  },
});

export const { setCodeChefUser, clearCodeChefUser } = codeChefSlice.actions;

export default codeChefSlice.reducer;
