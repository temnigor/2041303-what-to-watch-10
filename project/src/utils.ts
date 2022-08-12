import { Rating } from './const';

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

export {getDataTime, getRating, getCommentTime};
