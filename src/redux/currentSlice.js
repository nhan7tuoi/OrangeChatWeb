import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 'ChatWelcome',
  userId: null,
  conversationReload:null
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
    },
    setConversationReload(state, action) {
      state.conversationReload = action.payload;
    }
  }
});

export const { setCurrentPage, setUserId,setConversationReload } = currentSlice.actions;
export default currentSlice.reducer;
