import { AxiosInstance } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { APIRoute, AuthorizationStatus } from "../const";
import {  AppDispatch, AuthData, State, UserData } from "../types/store";
import { Film, ServerFilm } from "../types/film";
import { getUserNameAction, loadFilm, requireAuthorizationStatus, setErrorLoginAction, setLoadingFilmsAction } from "./action";
import { api, store } from ".";
import { removeToken, saveToken } from "../services/token";
const TIMEOUT_SHOW_ERROR = 10000;

const serverToFilms = (serverFilm:ServerFilm) =>{
  const film = {
    id:String(serverFilm.id),
    bigPoster:serverFilm.backgroundImage,
    poster: serverFilm.posterImage,
    previewImage:serverFilm.previewImage,
    filmName:serverFilm.name,
    genre: serverFilm.genre,
    yearCreation : serverFilm.released,
    description:serverFilm.description,
    rating: serverFilm.rating,
    ratingCount: serverFilm.scoresCount,
    director: serverFilm.director,
    starring: serverFilm.starring,
    runTime: serverFilm.runTime,
    videoLink: serverFilm.previewVideoLink,
    isFavorite:serverFilm.isFavorite,
    backgroundColor:serverFilm.backgroundColor
  };
  return film;
};
export const fetchFilmsActions = createAsyncThunk<void, undefined, { dispatch: AppDispatch,
  state: State, extra:AxiosInstance}>(
  'data/fetchFilms',
   async (_arg, {dispatch, extra:api})=> {
    dispatch(setLoadingFilmsAction(true));
   const {data} = await api.get(APIRoute.Films);
   const films:Film[] = await data.map((film:ServerFilm)=>serverToFilms(film));
   dispatch(loadFilm(films));
   dispatch(setLoadingFilmsAction(false));
  })

export const checkAutAction = createAsyncThunk<void, undefined, { dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
  'user/checkAut',
    async (_arg, {dispatch, extra:api}) => {
    try{ await api.get(APIRoute.Login);
          dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
        }catch {
          dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
        }
     }
    )

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
  }>(
    'user/login',
async ({login:email, password}, {dispatch, extra:api})=> {
  try {
  const {data:{token, name}} = await api.post<UserData>(APIRoute.Login, {email, password});
  saveToken(token);
  dispatch(getUserNameAction(name));
  dispatch(requireAuthorizationStatus(AuthorizationStatus.Auth));
  }catch {
    dispatch(setErrorLoginAction(true));
    dispatch(getUserNameAction(''));
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    dispatch(clearErrorAction());
  }
}
)

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/logout',
  async ( _arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.logout);
    dispatch(requireAuthorizationStatus(AuthorizationStatus.NoAuth));
    removeToken();
  }
)

export const clearErrorAction = createAsyncThunk(
  'user/errorLogin',
  () => setTimeout(()=> store.dispatch(setErrorLoginAction(false)), TIMEOUT_SHOW_ERROR)
)
