import { NameSpace } from '../../const';
import { Film } from '../../types/film';
import { Review } from '../../types/review';
import { State } from '../../types/store';

const getAllFilms = (state:State):Film[] => state[NameSpace.Data].allFilms;
const getSimilarFilms = (state:State):Film[] => state[NameSpace.Data].similarFilms;
const getFavoriteFilms = (state:State):Film[] => state[NameSpace.Data].favoriteFilms;
const getOpenedFilms = (state:State):Film|undefined => state[NameSpace.Data].openedFilm;
const getIsErrorResponse = (state:State):boolean => state[NameSpace.Data].isErrorResponse;
const getIsLoadingFilms = (state:State):boolean => state[NameSpace.Data].isLoadingFilms;
const getReviews = (state:State):Review[] => state[NameSpace.Data].reviews;
const getPromoFilm = (state:State):Film | undefined => state[NameSpace.Data].promoFilm;

export {
  getAllFilms,
  getPromoFilm,
  getSimilarFilms,
  getFavoriteFilms,
  getOpenedFilms,
  getIsErrorResponse,
  getIsLoadingFilms,
  getReviews
};
