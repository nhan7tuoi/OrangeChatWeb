import { configureStore } from '@reduxjs/toolkit';
import languageReducer from './languageSlice';
import authSlice from './authSlice';
import conversationSlice from './conversationSlice';
import currentSlice from './currentSlice';
import friendSilce from './friendSilce';
import authLogin from './authLogin';
import {thunk} from 'redux-thunk';
import stickerSlice from './stickerSlice';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const rootReducer = combineReducers({
    language: languageReducer,
    auth: authSlice,
    conversation: conversationSlice,
    current: currentSlice,
    friend: friendSilce,
    authLogin: authLogin,
    sticker: stickerSlice,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
  // middleware: getDefaultMiddleware().concat(thunk),
});
const persistor = persistStore(store);

export { store, persistor };
