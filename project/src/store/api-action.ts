import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AuthorizationStatus } from '../const';
import { AppDispatch, AuthData, favoriteDataPost, State, ToPostReviveData, UserData } from '../types/store';
import { Film, ServerFilm } from '../types/film';
import { loadOpenFilm, getUserNameAction, loadFilms, requireAuthorizationStatus, setErrorLoginAction, loadSimilarFilms, loadReviews, isErrorResponseAction, loadFavoriteFilms } from './action';
import { store } from '.';
import { removeToken, saveToken } from '../services/token';
import { Review } from '../types/review';

const TIMEOUT_SHOW_ERROR = 10000;
const NO_AUTH_NAME = 'Unknown';

const serverToFilms = (serverFilm:ServerFilm) =>{
  const film = {
    id:serverFilm.id,
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
    videoLinkPlayer:serverFilm.videoLink,
    videoLink:serverFilm.previewVideoLink,
    isFavorite:serverFilm.isFavorite,
    backgroundColor:serverFilm.backgroundColor
  };
  return film;
};


export const fetchFilmsActions = createAsyncThunk<void, undefined, { dispatch: AppDispatch,
  state: State, extra:AxiosInstance}>(
    'data/fetchFilms',
    async (_arg, {dispatch, extra:api})=> {
      const {data} = await api.get<ServerFilm[]>(APIRoute.Films);
      const films:Film[] = await data.map((film:ServerFilm)=>serverToFilms(film));
      dispatch(loadFilms(films));
    });

export const getDataOpenFilmAction = createAsyncThunk<void, number, {dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'film/fetchOpenFilm',
    async (id:number, {dispatch, extra:api}) => {
      try{
        if(isNaN(id)){
          dispatch(isErrorResponseAction(true));
          dispatch(clearResponseErrorAction());
          return;
        }
        const routeOnePage = APIRoute.OneFilm.replace('{filmId}', `${id}`);
        const oneServerFilm = await api.get<ServerFilm>(routeOnePage);
        const openFilm:Film = serverToFilms(oneServerFilm.data);
        dispatch(loadOpenFilm(openFilm));
      } catch {
        dispatch(isErrorResponseAction(true));
        dispatch(clearResponseErrorAction());
      }
    }
  );


export const getDataSimilarFilmsAction = createAsyncThunk<void, number, {dispatch:AppDispatch,
    state: State, extra:AxiosInstance}>(
      'film/fetchOpenFilm',
      async (id:number, {dispatch, extra:api}) => {
        const routeSimilarFilms = APIRoute.SimilarFilms.replace('{filmId}', `${id}`);
        const similarServerFilms = await api.get<ServerFilm[]>(routeSimilarFilms);
        const similarFilms = await similarServerFilms.data.map((film:ServerFilm)=>serverToFilms(film));
        dispatch(loadSimilarFilms(similarFilms));
      }
    );

export const getDataReviewsOpenFilm = createAsyncThunk<void, number, {dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'film/fetchReviews',
    async (id:number, {dispatch, extra:api}) => {
      const routeReviews = APIRoute.Comments.replace('{filmId}', `${id}`);
      const {data} = await api.get<Review[]>(routeReviews);
      dispatch(loadReviews(data));
    }
  );

export const postReviveAction = createAsyncThunk<void, ToPostReviveData, {dispatch:AppDispatch,
    state: State, extra:AxiosInstance}> (
      'film/postRevive',
      async ({comment, rating, id}, {dispatch, extra:api}) => {
        try {
          const route = APIRoute.Comments.replace('{filmId}', `${id}`);
          await api.post(route, {'comment':comment, 'rating':rating});
          dispatch(getDataReviewsOpenFilm(id));
        } catch {
          dispatch(isErrorResponseAction(true));
          dispatch(clearResponseErrorAction());
        }
      }
    );


export const fetchFavoriteFilmAction = createAsyncThunk<void, undefined, {dispatch:AppDispatch,
      state: State, extra:AxiosInstance}>(
        'film/fetchFavoriteFilms',
        async (_arg, {dispatch, extra:api}) => {
          try {
            const {data} = await api.get<ServerFilm[]>(APIRoute.FavoriteFilms);
            const favoriteFilms = await data.map((film:ServerFilm)=>serverToFilms(film));
            dispatch(loadFavoriteFilms(favoriteFilms));
          } catch {
            dispatch(isErrorResponseAction(true));
            dispatch(clearResponseErrorAction());
          }
        }
      );

export const postFavoriteFilmAction = createAsyncThunk<void, favoriteDataPost, { dispatch:AppDispatch,
    state:State, extra:AxiosInstance}>(
      'film/postFavorite',
      async ({idFilm, status}:favoriteDataPost, {dispatch, extra:api} ) => {
        if(isNaN(idFilm)){
          dispatch(isErrorResponseAction(true));
          dispatch(clearResponseErrorAction());
          return;
        }
        const route = APIRoute.PostFavorite.replace('{filmId}/{status}', `${idFilm}/${status}`);
        const {data} = await api.post(route);
        dispatch(loadOpenFilm(serverToFilms(data)));
        const filmsServer = await api.get<ServerFilm[]>(APIRoute.Films);
        const films:Film[] = await filmsServer.data.map((film:ServerFilm)=>serverToFilms(film));
        dispatch(loadFilms(films));
      }
    );

export const checkAutAction = createAsyncThunk<string, undefined, { dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'user/checkAut',
   async (_arg, {dispatch, extra:api}) => {
    const {data:{name}} = await api.get(APIRoute.Login);
    return name;
  }

  );

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
  }>(
    'user/login',
    async ({login:email, password}, {dispatch, extra:api})=> {
      try {
        const {data:{token, name}} = await api.post<UserData>(APIRoute.Login, {email, password});
        saveToken(token);
        return name;
      }catch {
        dispatch(setErrorLoginAction(true));
        dispatch(clearErrorAction());
        return NO_AUTH_NAME;
      }
    }
  );

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance,
}>(
  'user/logout',
  async ( _arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.logout);
    removeToken();
  }
);

export const clearErrorAction = createAsyncThunk(
  'user/errorLogin',
  () => setTimeout(()=> store.dispatch(setErrorLoginAction(false)), TIMEOUT_SHOW_ERROR)
);

export const clearResponseErrorAction = createAsyncThunk(
  'user/errorLoading',
  () => setTimeout(()=> store.dispatch(isErrorResponseAction(false)), TIMEOUT_SHOW_ERROR)
);
