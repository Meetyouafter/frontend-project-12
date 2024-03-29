import { createAsyncThunk } from '@reduxjs/toolkit';
import InitialService from '../api/InitialService';

const getInitialData = createAsyncThunk(
  'api/v1/data',
  async (token) => {
    const response = await InitialService.getData(token);
    return response.data;
  },
);

export default getInitialData;
