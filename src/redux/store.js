import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import authSlice from './authSlice';
import conversationSlice from './conversationSlice';
import currentSlice from './currentSlice';
import friendSilce from './friendSilce';
import authLogin from './authLogin';
import {thunk} from 'redux-thunk';
import stickerSlice from './stickerSlice';


const store = configureStore({
  reducer: {
    language: languageReducer,
    auth: authSlice,
    conversation: conversationSlice,
    current: currentSlice,
    friend: friendSilce,
    authLogin: authLogin,
    sticker: stickerSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
});
export default store;
