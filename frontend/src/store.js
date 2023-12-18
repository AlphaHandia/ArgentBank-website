import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../src/features/user/userSlice";
// Importation des thunks d'utilisateur pour être utilisés comme arguments supplémentaires
import {
  loginUserAsync,
  postUserProfile,
  putUserNameAsync,
} from "./features/user/userThunks";
// Configuration du store Redux
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: { loginUserAsync, postUserProfile, putUserNameAsync },// Passage des thunks en tant qu'arguments supplémentaires pour les actions asynchrones
      },
    }),
});

export default store;
