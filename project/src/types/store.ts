
import { store } from '../store/index';
import { Film } from './film';
import { Review } from './review';


export type UserData = {
avatarUrl: string
email: string
id: number
name: string
token: string
};

export type favoriteDataPost = {
  filmId:number,
  status:boolean
}

export type ToPostReviveData = {
   comment: string,
    rating: number,
    id:number
};

export type AuthData = {
  login: string,
  password: string,
};

export type UserProcess = {
  authorizationStatus: string,
  isErrorAuth:boolean,
}

export type DataAPIProcess = {
  allFilms:Film[],
  favoriteFilms:Film[],
  openedFilm:Film | undefined,
  isErrorResponse:boolean,
  isLoadingFilms:boolean,
  similarFilms:Film[],
  reviews:Review[],
  sentReview:Review[],
}

export type MainGenreFilterProcess = {
  filter:string,
  filmFilterCount:number,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
