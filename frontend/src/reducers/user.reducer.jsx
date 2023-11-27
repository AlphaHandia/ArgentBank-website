import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    LOGOUT_USER,
  } from "../actions/post.user.action";
  import { USER_PROFILE } from "../actions/post.userprofile.action";
  import { CHANGE_USER_NAME } from "../actions/put.username.action";
  
  // état initial 
  const initialState = {
    userProfile: "",
  };
  
  const UserReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOGIN_SUCCESS:
        return {
          ...state,
        };
      case USER_LOGIN_FAIL:
        return {
          ...state,
          loginError: action.payload,//On met à jour la propriété loginErroravec action.payload
        };
      case LOGOUT_USER:
        return {
          ...state,
          userProfile: "",// On réinitialise la propriété
        };
      case USER_PROFILE:
        return {
          ...state,
          userProfile: action.payload,// On met à jour la propriété userProfile avec action.payload
        };
      case CHANGE_USER_NAME:
        // On crée un nouveau userProfile avec le nom d'utilisateur mis à jour
        const newProfile = { ...state.userProfile, userName: action.payload };
        return {
          ...state,
          userProfile: newProfile, // On met à jour la propriété userProfile avec la nouvelle
        };
  
      default:
        return state;
    }
  };
  
  export default UserReducer;