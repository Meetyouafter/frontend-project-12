import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationProps: {
    variant: '',
    text: '',
    isShow: false,
  },
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationProps: (state, action) => ({
      ...state,
      notificationProps: { ...action.payload },
    }),
    clearNotificationProps: (state, action) => ({
      ...state,
      notificationProps: { ...action.payload },
    }),
  },
});

export const { setNotificationProps, clearNotificationProps } = notificationSlice.actions;

export default notificationSlice.reducer;
