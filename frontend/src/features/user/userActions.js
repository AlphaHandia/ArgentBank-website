
import { userLoginFail, userLoginSuccess, setUserProfile, changeUserName } from './userSlice';
import axios from 'axios';

export const loginUser = (email, password, navigate, rememberMe) => async (dispatch) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
      email: email,
      password: password,
    });

    if (response.status === 200) {
      const token = response.data.body.token;
      if (rememberMe) {
        localStorage.setItem('token', token);
      } else {
        sessionStorage.setItem('token', token);
      }
     
      dispatch(userLoginSuccess());
      navigate('/user-account');
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

export const putUserName = (userName) => async (dispatch) => {
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
