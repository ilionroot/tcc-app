export const formatTime = (timer) => {
  const getSeconds = `0${timer % 60}`.slice(-2);
  const minutes = `${Math.floor(timer / 60)}`;
  const getMinutes = `0${minutes % 60}`.slice(-2);

  return `${
    40 - getMinutes == 40 && 60 - getSeconds == 60 ? 40 : 39 - getMinutes
  } : ${60 - getSeconds == 60 ? getSeconds : 60 - getSeconds}`;
};
