const scrollToBottom = (element) => {
  const el = element;
  if (el.current) {
    el.current.scrollTop = el.current.scrollHeight - el.current.clientHeight;
  } else {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
};

export default scrollToBottom;
