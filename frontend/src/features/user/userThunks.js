import axios from 'axios';
import { userLoginSuccess, userLoginFail, setUserProfile, changeUserName } from './userSlice';


export const loginUserAsync = ({ email, password, rememberMe}) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
      email,
      password,
    });

    if (response.status === 200) {
      const token = response.data.body.token;
      console.log("Token:", token);
      
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token',token);
      }

      dispatch(userLoginSuccess());
      dispatch(postUserProfile());
    } else {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
    }
  } catch (error) {
    dispatch(userLoginFail('Incorrect username or password'));
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }
};

export const postUserProfile = () => async (dispatch) => {
  
  let token = localStorage.getItem('token');

  if (!token) {
    token = sessionStorage.getItem('token');
  }

  if (!token) {
    return;
  }

  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      const userProfile = response.data.body;
      dispatch(setUserProfile(userProfile));
    }
  } catch (error) {
    console.error(error);
  }
};

export const putUserNameAsync = (userName) => async (dispatch) => {
  let token = localStorage.getItem('token');

  if (!token) {
    token = sessionStorage.getItem('token');
  }
  if (!token) {
    return;
  }

  try {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', { userName }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(changeUserName(userName));
    }
  } catch (error) {
    console.error(error);
  }
};
