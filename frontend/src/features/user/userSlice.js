
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: { userProfile: null, loginError: null },
  reducers: {
    // Réducteur pour une connexion réussie
    userLoginSuccess: (state) => {
      state.loginError = null;
      return state;
    },
    // Réducteur pour une connexion échouée
    userLoginFail: (state, action) => {
      state.loginError = action.payload;
    },
    // Réducteur pour la déconnexion de l'utilisateur
    logoutUser: (state) => {
      state.userProfile = null;
      localStorage.removeItem("token");
      sessionStorage.removeItem("token");
    },
    // Réducteur pour définir le profil de l'utilisateur
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    // Réducteur pour changer le nom d'utilisateur
    changeUserName: (state, action) => {
      const newProfile = { ...state.userProfile, userName: action.payload };
      state.userProfile = newProfile;
    },
  },
});

// Exportation des actions générées automatiquement à partir des réducteurs
export const {
  userLoginSuccess,
  userLoginFail,
  logoutUser,
  setUserProfile,
  changeUserName,
} = userSlice.actions;

export default userSlice.reducer;
