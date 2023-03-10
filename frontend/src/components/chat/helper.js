const getMessageNameCount = (count) => {
  const remainder = count % 10;
  if (count === 0) {
    return 0; // сообщения
  } if (count === 1) {
    return 5; // massage
  } if ((count > 4 && count < 21)
  || (remainder > 4 && remainder < 9) || remainder === 0) {
    return 1; // сообщений
  } if (remainder > 1 && remainder < 5 && count !== 1) {
    return 2; // сообщения
  }
  return 3; // сообщение
};

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

export { getMessageNameCount, getActiveChannelName, getMessagesCount };
