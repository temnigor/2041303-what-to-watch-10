import { Rating } from './const';

const ONE_TIME_LIMIT = 60;
const ONE_HOUR = 3600;

const getRunTimeToString = (time:number) => {
  if(time > ONE_TIME_LIMIT) {
    const hour = Math.floor(time / ONE_TIME_LIMIT);
    const minute = time - hour * ONE_TIME_LIMIT;
    return `${hour}h ${minute}m`;
  }
  return `${time}m`;
};

const getDataTime = (date:string):string => {
  const dateToDateTime = new Date(date);
  const dataTime = `${dateToDateTime.getFullYear()}-${dateToDateTime.getMonth()}-${dateToDateTime.getDate()}`;
  return dataTime;
};

const getCommentTime = (date:string):string => {
  const dateToDateTime = new Date(date).toString().split(' ');
  const dateTime = `${dateToDateTime[1]} ${dateToDateTime[2]}, ${dateToDateTime[3]}`;
  return dateTime;
};

const getRating = (num:number) => {
  switch(true){
    case num < 3:
      return Rating.BAD;
    case num < 5:
      return Rating.NORMAL;
    case num < 8:
      return Rating.GOOD;
    case num < 10:
      return Rating.VERY;
    default:
      return Rating.AWESOME;
  }
};

const getFilmTime = (timeEnd:number, currentTime:number) => {
  const tameToEnd = timeEnd - currentTime;

  if(tameToEnd >= ONE_HOUR){
    const hour = Math.floor(tameToEnd / (ONE_HOUR));
    const min = Math.floor((tameToEnd - (hour * ONE_HOUR)) / ONE_TIME_LIMIT);
    const seconds = Math.floor(tameToEnd - ((hour * ONE_HOUR) + (min * ONE_TIME_LIMIT)));
    return `${hour}:${min}:${seconds}`;
  }

  if(tameToEnd >= ONE_TIME_LIMIT) {
    const min = Math.floor(tameToEnd / ONE_TIME_LIMIT);
    const seconds = tameToEnd - min * ONE_TIME_LIMIT;
    return `${min}:${seconds}`;
  }

  return `00:${Math.floor(tameToEnd)}`;
};

const filmTogglePlayer = (finish:number, start:number) => (start / finish) * 100;

export {getDataTime, getRating, getCommentTime, getRunTimeToString, getFilmTime, filmTogglePlayer};
