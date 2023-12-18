import { combineReducers } from "redux";
import authSlice from "./authSlice";
import userProfileSlice from "./userProfileSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  userProfile: userProfileSlice.reducer,
});

export default rootReducer;
