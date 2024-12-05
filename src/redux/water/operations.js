import { createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../auth/operations';
import { checkIsToday } from '../../utils/getDateNow';
import { selectChoosenDay } from '../common/selectors';

export const getWaterByDay = createAsyncThunk(
  'water/getWaterByDay',
  async (date, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/water/day/${date}`);

      const isToday = checkIsToday(date);

      const waterList = [...data.data];

      return { waterList, isToday };
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

export const getWaterByMonth = createAsyncThunk(
  'water/getWaterByMonth',
  async (date, thunkAPI) => {
    try {
      const { data } = await instance.get(`/api/water/month/${date}`);

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

export const addWater = createAsyncThunk(
  'water/addWater',
  async (water, thunkAPI) => {
    try {
      const { data } = await instance.post('/api/water', water);
      const isToday = checkIsToday(new Date());

      const addedWater = data.data;
      return { addedWater, isToday };
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

export const updateWater = createAsyncThunk(
  'water/updateWater',
  async ({ id, updatedWater }, thunkAPI) => {
    try {
      const { data } = await instance.patch(`api/water/${id}`, {
        ...updatedWater,
      });

      const isToday = checkIsToday();
      console.log(selectChoosenDay);

      console.log(isToday);

      const responseWater = data.data;

      return { responseWater, isToday };
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

export const deleteWater = createAsyncThunk(
  'water/deleteWater',
  async (id, thunkAPI) => {
    try {
      await instance.delete(`api/water/${id}`);

      return id;
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
