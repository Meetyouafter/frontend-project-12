/* eslint-disable functional/no-let */
const getMessageNameCount = (count) => {
  const remainder = count % 10;
  let completion = 'й';
  if (remainder === 1) completion = 'е';
  if (remainder > 1 && remainder < 5) completion = 'я';
  return `сообщени${completion}`;
};

export default getMessageNameCount;
