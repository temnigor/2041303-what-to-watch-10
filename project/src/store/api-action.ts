import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { AppDispatch, AuthData, FilmIdData, State, ToPostReviveData, UserData } from '../types/store';
import { Film, ServerFilm } from '../types/film';
import { loadOpenFilm, getUserNameAction, loadFilms, requireAuthorizationStatus, setErrorLoginAction, loadingPageAction, loadSimilarFilms, loadReviews, isErrorResponseAction } from './action';
import { store } from '.';
import { removeToken, saveToken } from '../services/token';
import { Reviews } from '../types/review';
import { useNavigate } from 'react-router-dom';
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
      dispatch(loadingPageAction(true));
      const {data} = await api.get<ServerFilm[]>(APIRoute.Films);
      const films:Film[] = await data.map((film:ServerFilm)=>serverToFilms(film));
      dispatch(loadFilms(films));
      dispatch(loadingPageAction(false));
    });

export const getDataOpenFilmAction = createAsyncThunk<void, FilmIdData, {dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'film/fetchOneFilm',
    async ({id}:FilmIdData, {dispatch, extra:api}) => {
      const navigate = useNavigate();
      try{
        const routeOnePage = APIRoute.OneFilm.replace('{filmId}', id);
        const oneServerFilm = await api.get<ServerFilm>(routeOnePage);
        const openFilm:Film = serverToFilms(oneServerFilm.data);
        dispatch(loadOpenFilm(openFilm));
      } catch {
        navigate(AppRoute.Error);
      }
    }
  );

export const getDataSimilarFilmsAction = createAsyncThunk<void, FilmIdData, {dispatch:AppDispatch,
    state: State, extra:AxiosInstance}>(
      'film/fetchOpenFilm',
      async ({id}:FilmIdData, {dispatch, extra:api}) => {
        const routeSimilarFilms = APIRoute.SimilarFilms.replace('{filmId}', id);
        const similarServerFilms = await api.get<ServerFilm[]>(routeSimilarFilms);
        const similarFilms = await similarServerFilms.data.map((film:ServerFilm)=>serverToFilms(film));
        dispatch(loadSimilarFilms(similarFilms));
      }
    );

export const getDataReviewsOpenFilm = createAsyncThunk<void, FilmIdData, {dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'film/fetchReviews',
    async ({id}:FilmIdData, {dispatch, extra:api}) => {
      const routeReviews = APIRoute.Comments.replace('{filmId}', id);
      const {data} = await api.get<Reviews[]>(routeReviews);
      dispatch(loadReviews(data));
    }
  );

export const postReviveAction = createAsyncThunk<void, ToPostReviveData, {dispatch:AppDispatch,
    state: State, extra:AxiosInstance}> (
      'film/postRevive',

      async ({comment, rating, id}, {dispatch, extra:api}) => {
        try {
          const route = APIRoute.Comments.replace('{filmId}', id);
          await api.post(route, {'comment':comment, 'rating':rating});
          dispatch(getDataReviewsOpenFilm({id}));
        } catch (err) {
          console.error(err)
          dispatch(isErrorResponseAction(true));
          dispatch(clearResponseErrorAction());
        }
      }
    );

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
  );

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
  );

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
);

export const clearErrorAction = createAsyncThunk(
  'user/errorLogin',
  () => setTimeout(()=> store.dispatch(setErrorLoginAction(false)), TIMEOUT_SHOW_ERROR)
);

export const clearResponseErrorAction = createAsyncThunk(
  'user/errorLoading',
  () => setTimeout(()=> store.dispatch(isErrorResponseAction(false)), TIMEOUT_SHOW_ERROR)
);
