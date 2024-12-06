import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://watertrack.onrender.com/',
});

const setAuthToken = token => {
  instance.defaults.headers.common.Authorization = `Bearer ${token}`;
};

instance.interceptors.request.use(
  request => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      request.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return request;
  },
  error => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  response => response,
  async error => {
    const errorMessage = error.response.data.message;

    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      errorMessage !== 'Credentials not verified' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');

        if (refreshToken === null) {
          throw error();
        }

        const response = await instance.post('api/auth/refresh', {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } =
          response.data.data;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', newRefreshToken);

        setAuthToken(accessToken);
        return instance(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

        window.location.href = '/signin';

        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (formData, thunkAPI) => {
    try {
      await instance.post('api/auth/register', formData);

      const { data } = await instance.post('api/auth/login', formData);
      localStorage.setItem('isLoggedIn', JSON.stringify('true'));

      setAuthToken(data.data.accessToken);

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);

      return data.data;
    } catch (error) {
      if (error.response) {
        const status = error.response.data.status;
        const message =
          error.response.data.message || 'Unexpected error occurred';
        return thunkAPI.rejectWithValue({ status, message });
      } else {
        return thunkAPI.rejectWithValue({
          status: 0,
          message: 'Network error. Please try again.',
        });
      }
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (formData, thunkAPI) => {
    try {
      const { data } = await instance.post('api/auth/login', formData);
      localStorage.setItem('isLoggedIn', JSON.stringify('true'));

      setAuthToken(data.data.accessToken);

      localStorage.setItem('accessToken', data.data.accessToken);
      localStorage.setItem('refreshToken', data.data.refreshToken);

      return data.data;
    } catch (error) {
      if (error.response) {
        const status = error.response.data.status;
        const message =
          error.response.data.message || 'Unexpected error occurred';
        return thunkAPI.rejectWithValue({ status, message });
      } else {
        return thunkAPI.rejectWithValue({
          status: 0,
          message: 'Network error. Please try again.',
        });
      }
    }
  }
);

export const refreshUser = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      return;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
  {
    condition: (_, thunkAPI) => {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      if (token) return true;

      return false;
    },
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    await instance.post('api/auth/logout', { accessToken });

    setAuthToken('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  } catch (error) {
    if (error.response) {
      const status = error.response.data.status;
      const message =
        error.response.data.message || 'Unexpected error occurred';
      return thunkAPI.rejectWithValue({ status, message });
    } else {
      return thunkAPI.rejectWithValue({
        status: 0,
        message: 'Network error. Please try again.',
      });
    }
  }
});

export const sendResetPasswordEmail = createAsyncThunk(
  'auth/sendResetPasswordEmail',
  async (email, thunkAPI) => {
    try {
      const { data } = await instance.post('api/auth/request-reset-email', {
        email,
      });

      return data;
    } catch (error) {
      if (error.response) {
        const status = error.response.data.status;
        const message =
          error.response.data.message || 'Unexpected error occurred';
        return thunkAPI.rejectWithValue({ status, message });
      } else {
        return thunkAPI.rejectWithValue({
          status: 0,
          message: 'Network error. Please try again.',
        });
      }
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (resetData, thunkAPI) => {
    try {
      console.log(resetData);

      const { data } = await instance.post('api/auth/reset-password', {
        ...resetData,
      });
      console.log(data);

      return data;
    } catch (error) {
      if (error.response) {
        const status = error.response.data.status;
        const message =
          error.response.data.message || 'Unexpected error occurred';
        return thunkAPI.rejectWithValue({ status, message });
      } else {
        return thunkAPI.rejectWithValue({
          status: 0,
          message: 'Network error. Please try again.',
        });
      }
    }
  }
);
