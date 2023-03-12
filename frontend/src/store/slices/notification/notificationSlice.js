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
    setNotificationProps: (state, action) => ({ notificationProps: { ...action.payload } }),
    clearNotificationProps: () => ({ notificationProps: { isShow: false } }),
  },
});

export const { setNotificationProps, clearNotificationProps } = notificationSlice.actions;

export default notificationSlice.reducer;
