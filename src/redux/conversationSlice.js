import {createSlice} from '@reduxjs/toolkit';

const conversationSlice = createSlice({
  name: 'conversation',
  initialState: {
    conversations: [],
    members: [],
    conversationGroups: [],
  },
  reducers: {
    setConversations: (state, action) => {
      state.conversations = action.payload;
    },
    addMember: (state, action) => {
      state.members = [...state.members, action.payload];
    },
    removeMember: (state, action) => {
      state.members = state.members.filter(m => m._id !== action.payload);
    },
    setMembers: (state, action) => {
      state.members = action.payload;
    },
    setConversationGroups: (state, action) => {
      state.conversationGroups = action.payload;
    },
  },
});
export const {
  setConversations,
  addMember,
  removeMember,
  setMembers,
  setConversationGroups,
} = conversationSlice.actions;
export default conversationSlice.reducer;