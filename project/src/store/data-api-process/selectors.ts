import { NameSpace } from '../../const';
import { Film } from '../../types/film';
import { Review } from '../../types/review';
import { State } from '../../types/store';

const getAllFilms = (state:State):Film[] => state[NameSpace.DATA].allFilms;
const getSimilarFilms = (state:State):Film[] => state[NameSpace.DATA].similarFilms;
const getFavoriteFilms = (state:State):Film[] => state[NameSpace.DATA].favoriteFilms;
const getOpenedFilms = (state:State):Film|undefined => state[NameSpace.DATA].openedFilm;
const getIsErrorResponse = (state:State):boolean => state[NameSpace.DATA].isErrorResponse;
const getIsLoadingFilms = (state:State):boolean => state[NameSpace.DATA].isLoadingFilms;
const getReviews = (state:State):Review[] => state[NameSpace.DATA].reviews;
const getSentReview = (state:State):Review[] => state[NameSpace.DATA].sentReview;

export {
  getAllFilms,
  getSimilarFilms,
  getFavoriteFilms,
  getOpenedFilms,
  getIsErrorResponse,
  getIsLoadingFilms,
  getReviews,
  getSentReview
};
