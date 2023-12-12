import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../src/features/user/userSlice';
import { loginUserAsync, postUserProfile, putUserNameAsync } from './features/user/userThunks';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: { extraArgument: { loginUserAsync, postUserProfile, putUserNameAsync } },
    }),
});

export default store;
