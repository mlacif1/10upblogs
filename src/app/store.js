import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';

export default configureStore({
  reducer: {
    userLogin: loginReducer
  },
  middleware: getDefaultMiddleware(),
});
