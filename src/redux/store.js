import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import authSlice from './authSlice';
import conversationSlice from './conversationSlice';

const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authSlice,
    conversation: conversationSlice,
  },
});
export default store;
