import { store } from '../store';
import { UserProcess } from '../store/user-process/user-process';


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

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
