import { createAsyncThunk } from '@reduxjs/toolkit';
<<<<<<< HEAD:frontend/src/store/getInitialData.js
import InitialService from '../api/InitialService';
=======
import InitialServise from '../../../api/initialData';
>>>>>>> parent of 3144111 (refactoring api):frontend/src/store/slices/initialData/getInitialData.js

const getInitialData = createAsyncThunk(
  'api/v1/data',
  async (token) => {
    const response = await InitialServise.getChannelData(token);
    return response.data;
  },
);

export default getInitialData;
