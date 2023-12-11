import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUserAsync = createAsyncThunk('user/loginUser', async ({ email, password, rememberMe }) => {
  try {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
      email,
      password
    });

    if (response.status === 200) {
      const token = response.data.body.token;
      if (rememberMe) {
        localStorage.setItem('token');
      } else {
        sessionStorage.setItem('token');
      }

      return { token };
    } else {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      throw new Error('Incorrect username or password');
    }
  } catch (error) {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    throw new Error('Incorrect username or password');
  }
});

export const setUserProfileAsync = createAsyncThunk('user/setUserProfile', async (_, { getState }) => {
  const { user: { token } } = getState();

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
      return userProfile;
    }
  } catch (error) {
    console.error(error);
  }
  
});
export const postUserProfileAsync = createAsyncThunk('user/postUserProfile', async (_, { getState }) => {
  const { user: { token } } = getState();

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
      return userProfile;
    }
  } catch (error) {
    console.error(error);
    
    throw error;
  }
});
export const putUserNameAsync = createAsyncThunk('user/putUserName', async (userName, { getState }) => {
  const { user: { token } } = getState();

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
      return userName;
    }
  } catch (error) {
    console.error(error);
  }
});
export const logoutUserAsync = createAsyncThunk('user/logoutUser', async (_, { getState }) => {
  const { user: { token } } = getState();

  try {
    // Vous pouvez effectuer d'autres actions nécessaires avant la déconnexion ici

    // Retirez le token du stockage local et de la session
    localStorage.removeItem('token',token);
    sessionStorage.removeItem('token',token);

    // Retournez le résultat si nécessaire
    return 'Déconnexion réussie';
  } catch (error) {
    console.error(error);
    // Vous pouvez gérer l'erreur ici ou laisser la promesse être rejetée
    throw error;
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { userProfile: null, token: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUserAsync.fulfilled, (state, { payload }) => {
        state.token = payload.token;
      })
      .addCase(setUserProfileAsync.fulfilled, (state, { payload }) => {
        state.userProfile = payload;
      })
      .addCase(putUserNameAsync.fulfilled, (state, { payload }) => {
        state.userProfile.userName = payload;
      })
      .addCase(postUserProfileAsync.fulfilled, (state, { payload }) => {
        state.userProfile = payload;
      })
      .addCase(logoutUserAsync.fulfilled, (state) => {
        state.userProfile = null;
        state.token = null;
      });
  },
});

export default userSlice.reducer;
