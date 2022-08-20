import { store } from '../store';
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
  idFilm:number,
  status:number
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
  userName:string,
  isErrorAuth:boolean,
}

export type DataAPIProcess = {
  allFilms:Film[],
  favoriteFilms:Film[],
  openedFilm:Film | undefined,
  isErrorResponse:boolean,
  isLoadingFilms:boolean,
  similarFilms:Film[],
  reviews:Review[]
}

export type MainGenreFilterProcess = {
  filter:string,
  filmFilterCount:number,
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
