import { createSlice } from '@reduxjs/toolkit';
import {
  getWaterByDay,
  getWaterByMonth,
  addWater,
  updateWater,
  deleteWater,
} from './operations';

const INITIAL_STATE = {
  monthWater: [],
  dailyWater: [],
  choosenDailyWater: [],
  isLoading: false,
  error: null,
};

export const waterSlice = createSlice({
  name: 'water',
  initialState: INITIAL_STATE,
  extraReducers: builder => {
    builder
      .addCase(getWaterByDay.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWaterByDay.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        state.dailyWater = action.payload.waterList;
        state.choosenDailyWater = action.payload.waterList;
      })
      .addCase(getWaterByDay.rejected, (state, action) => {
        state.dailyWater = [];
        state.choosenDailyWater = [];
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getWaterByMonth.pending, state => {
        state.isLoading = true;
      })
      .addCase(getWaterByMonth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.monthWater = action.payload;
      })
      .addCase(getWaterByMonth.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addWater.pending, state => {
        state.isLoading = true;
      })
      .addCase(addWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.dailyWater.push(action.payload);
        state.monthWater.push(action.payload);
        state.choosenDailyWater.push(action.payload);
      })
      .addCase(addWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(updateWater.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthWater = state.monthWater.map(water =>
          water.id === action.payload.id ? action.payload : water
        );
        state.dailyWater = state.dailyWater.map(water =>
          water.id === action.payload.id ? action.payload : water
        );
        state.choosenDailyWater = state.choosenDailyWater.map(water =>
          water.id === action.payload.id ? action.payload : water
        );
      })
      .addCase(updateWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(deleteWater.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteWater.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthWater = state.monthWater.filter(
          water => water.id !== action.payload
        );
        state.dailyWater = state.dailyWater.filter(
          water => water.id !== action.payload
        );
        state.choosenDailyWater = state.choosenDailyWater.filter(
          water => water.id !== action.payload
        );
      })
      .addCase(deleteWater.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const waterReducer = waterSlice.reducer;
