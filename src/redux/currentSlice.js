import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'ChatWelcome',
  userId: null
};

const currentSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    }
  }
});

export const { setCurrentPage, setUserId } = currentSlice.actions;
export default currentSlice.reducer;
