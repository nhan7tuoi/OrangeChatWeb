import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import authSlice from './authSlice';
import conversationSlice from './conversationSlice';
import currentSlice from './currentSlice';
import friendSilce from './friendSilce';
import {thunk} from 'redux-thunk';


const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authSlice,
    conversation: conversationSlice,
    current: currentSlice,
    friend: friendSilce,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
export default store;
