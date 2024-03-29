import { useEffect, useRef } from 'react';

const getActiveChannelName = (channelsData, activeChannelId) => {
  const activeChannelName = channelsData
    .filter((channel) => channel.id === activeChannelId)
    .map((channel) => channel.name);
  return activeChannelName;
};

const getMessagesCount = (activeChannelId, messages = []) => {
  const filteredMessages = messages.filter((mess) => mess.channelId === activeChannelId);
  return filteredMessages.length;
};

const usePreviousValue = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const scrollToBottom = (element) => {
  const el = element;
  if (el.current) {
    el.current.scrollTop = el.current.scrollHeight - el.current.clientHeight;
  }
};

export {
  getActiveChannelName, getMessagesCount, scrollToBottom, usePreviousValue,
};
