

import { createSlice } from '@reduxjs/toolkit';


const userSlice = createSlice({
  name: 'user',
  initialState: {userProfile:null},
  reducers: {
    userLoginSuccess: (state) => {
     
      return state;
    },
    userLoginFail: (state, action) => {
      state.loginError = action.payload;
    },
    logoutUser: (state) => {
      state.userProfile = null;
      
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    changeUserName: (state, action) => {
      const newProfile = { ...state.userProfile, userName: action.payload };
      state.userProfile = newProfile;
    },
  },
});

export const {
  userLoginSuccess,
  userLoginFail,
  logoutUser ,
  setUserProfile,
  changeUserName,
} = userSlice.actions;

export default userSlice.reducer;
