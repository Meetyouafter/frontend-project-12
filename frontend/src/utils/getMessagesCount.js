const getMessagesCount = (activeChannelId, messages = []) => {
  const filteredMessages = messages.filter((mess) => mess.channelId === activeChannelId);
  return filteredMessages.length;
};

export default getMessagesCount;
