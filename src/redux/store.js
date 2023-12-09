import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
// import { filterReducer } from './filterSlice';
import { filterReducer } from './reducers';
// import { contactsReducer } from './contactsSlice';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import logger from 'redux-logger';
import { myAPI } from '../api/myAPI';
import logger from 'redux-logger';

const middleware = getDefaultMiddleware =>
  getDefaultMiddleware({
    // serializableCheck: {
    //   ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    // },
  }).concat(myAPI.middleware, logger);

// const rootReducer = combineReducers({
//   filter: filterReducer,
//   contacts: contactsReducer,
// });

// const persistConfig = {
//   key: 'contactList',
//   storage,
//   blacklist: ['filter'],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: {
    [myAPI.reducerPath]: myAPI.reducer,
    filter: filterReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

// export const persistMaker = persistStore(store);
setupListeners(store.dispatch);
