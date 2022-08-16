import { store } from '../store';


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

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
