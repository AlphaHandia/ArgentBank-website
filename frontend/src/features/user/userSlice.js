import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { userProfile: null, loginError: null },
  reducers: {
    userLoginSuccess: (state) => {
      state.loginError = null;
      return state;
    },
    userLoginFail: (state, action) => {
      state.loginError = action.payload;
    },
    logoutUser: (state) => {
      state.userProfile = null;
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
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
  logoutUser,
  setUserProfile,
  changeUserName,
} = userSlice.actions;

export default userSlice.reducer;
