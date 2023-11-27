// Redux

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

// Configuration du store Redux
const store = configureStore({
    reducer: rootReducer,
    //activationde l'extension Redux DevTools pour le débogage
    devTools: true,
  });
  export default store 