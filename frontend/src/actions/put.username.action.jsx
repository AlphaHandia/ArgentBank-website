import axios from "axios";
export const CHANGE_USER_NAME = "CHANGE_USER_NAME";

///////// Action pour mettre à jour le nom d'utilisateur

export const changeUserName = (userName) => {
  return (dispatch) => {
    let token = localStorage.getItem("token");

    if (!token) {
      token = sessionStorage.getItem("token");
    }
    if (!token) {
      return;
    }

    axios
      .put(
        "http://localhost:3001/api/v1/user/profile",
        { userName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
         console.log(response)
        if (response.status === 200) {
          dispatch({
            type: CHANGE_USER_NAME,
            payload: userName,
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};