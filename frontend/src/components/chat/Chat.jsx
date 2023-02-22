import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getChannel } from '../../store/slices/channel/channelSlice';

const Chat = () => {
  if (!localStorage.token) return <Navigate to="/login" />;

  const dispatch = useDispatch();
  const channelData = useSelector((state) => state.channelSlice);

  useEffect(() => {
    dispatch(getChannel());
  }, [dispatch]);

  console.log(channelData);

  { if (channelData.isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  } }

  { if (channelData.errors) {
    return (
      <div>
        <p>Error</p>
      </div>
    );
  } }

  return (
    <div>
      <p>Chat</p>
    </div>
  );
};

export default Chat;
