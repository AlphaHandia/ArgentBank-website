import axios from "axios";
export const USER_PROFILE = "USER_PROFILE";

// Action pour récupérer le profil de l'utilisateur depuis le serveur

export const PostUserProfile = () => (dispatch) => {
  let token = localStorage.getItem("token");

  if (!token) {
    token = sessionStorage.getItem("token");
  }

  if (!token) {
    return;
  }

  axios
    .post(
      "http://localhost:3001/api/v1/user/profile",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      if (response.status === 200) {
        console.log(response)
        const userProfile = response.data.body;
        dispatch({
          type: USER_PROFILE,
          payload: userProfile,
        });
      }
    })
    .catch((error) => {
      console.error(error);
    });
};