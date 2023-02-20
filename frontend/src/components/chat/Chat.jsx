import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//import channelSlice from '../../store/slices/channel/index';
import getChannelDataSlice from '../../store/slices/channel/getChannelDataSlice';

const Chat = () => {
  if (!localStorage.token) return <Navigate to="/login" />;
  const dispatch = useDispatch();
  const data = useSelector((state) => state.channel);
  dispatch(getChannelDataSlice())
    .then(response => console.log(response))

  console.log(data)

  return (
    <div>
    <p>Chat</p>
    </div>
  );
};

export default Chat;
