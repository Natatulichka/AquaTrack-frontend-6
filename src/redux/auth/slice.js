import { createSlice } from '@reduxjs/toolkit';
import {
  login,
  logout,
  refreshUser,
  register,
  resetPassword,
  sendResetPasswordEmail,
} from './operations';

const INITIAL_STATE = {
  accessToken: null,
  refreshToken: null,
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  isRefreshing: false,
  isResetPasswordEmailSend: false,
  isResetPasswordSuccess: false,

  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    clearError: state => {
      state.error = null;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(register.pending, state => {
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(login.pending, state => {
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoggedIn = false;
      })

      .addCase(refreshUser.pending, state => {
        state.error = null;
        state.isRefreshing = true;
      })
      .addCase(refreshUser.fulfilled, state => {
        state.isLoggedIn = true;
        state.isRefreshing = false;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })

      .addCase(logout.pending, state => {
        state.error = null;
      })
      .addCase(logout.fulfilled, () => {
        return INITIAL_STATE;
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(sendResetPasswordEmail.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(sendResetPasswordEmail.fulfilled, state => {
        state.isResetPasswordEmailSend = true;
      })
      .addCase(sendResetPasswordEmail.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      })
      .addCase(resetPassword.pending, state => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, state => {
        state.isResetPasswordSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.error = action.payload;
        state.isRefreshing = false;
      }),
});

export const { clearError } = authSlice.actions;

export const authReducer = authSlice.reducer;
