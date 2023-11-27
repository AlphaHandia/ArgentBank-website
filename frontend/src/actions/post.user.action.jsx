import axios from "axios";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";
export const LOGOUT_USER = "LOGOUT_USER";
// gestion de l'échec de connexion de l'usager
export const userLoginFail = (error) => ({
    type: USER_LOGIN_FAIL,
    payload: error,
  });
// gestion de la connexion réussie de l'usager
export const userLoginSuccess = () => ({
  type: USER_LOGIN_SUCCESS,
});

// gestion de la deconnexion de l'usager
export const logoutUser = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  return {
    type: LOGOUT_USER,
  };
};
// gestion de la connexion de l'usager
export const loginUser =
  (email, password, navigate, rememberMe) => (dispatch) => {
    axios
      .post("http://localhost:3001/api/v1/user/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        if (response.status === 200) {
          // console.log(response)
          const token = response.data.body.token;
          if (rememberMe) {
            localStorage.setItem("token", token);
          } else {
            sessionStorage.setItem("token", token);
          }
          navigate("/user-account");
          dispatch(userLoginSuccess());
        } else {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
        }
      })
      .catch((error) => {
        dispatch(userLoginFail("Incorrect username or password"));
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
      });
  };