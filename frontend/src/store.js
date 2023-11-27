// Redux

import { configureStore } from "@reduxjs/toolkit";
import rootReucer from "./reducers";

// Configuration du store Redux
const store = configureStore({
    reducer: rootReucer,
    //activationde l'extension Redux DevTools pour le débogage
    devTools: true,
  });
  export default store 