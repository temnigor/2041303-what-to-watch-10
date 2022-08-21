import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute} from '../const';
import { AppDispatch, AuthData, favoriteDataPost, State, ToPostReviveData, UserData } from '../types/store';
import { Film, ServerFilm } from '../types/film';
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

export const fetchFilmsActions = createAsyncThunk<Film[], undefined, { dispatch: AppDispatch,
  state: State, extra:AxiosInstance}>(
    'data/fetchFilms',
    async (_arg, {dispatch, extra:api})=> {
      const {data} = await api.get<ServerFilm[]>(APIRoute.Films);
      const films:Film[] = await data.map((film:ServerFilm)=>serverToFilms(film));
      return films;
    });

export const getDataOpenFilmAction = createAsyncThunk<Film|undefined, number, {dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'film/fetchOpenFilm',
    async (id:number, {dispatch, extra:api}) => {
      const routeOnePage = APIRoute.OneFilm.replace('{filmId}', `${id}`);
      const oneServerFilm = await api.get<ServerFilm>(routeOnePage);
      const openFilm:Film = serverToFilms(oneServerFilm.data);
      return openFilm;
    }
  );

export const getDataSimilarFilmsAction = createAsyncThunk<Film[], number, {dispatch:AppDispatch,
    state: State, extra:AxiosInstance}>(
      'film/fetchSimilarFilm',
      async (id:number, {dispatch, extra:api}) => {
        const routeSimilarFilms = APIRoute.SimilarFilms.replace('{filmId}', `${id}`);
        const similarServerFilms = await api.get<ServerFilm[]>(routeSimilarFilms);
        const similarFilms:Film[] = await similarServerFilms.data.map((film:ServerFilm)=>serverToFilms(film));
        return similarFilms;
      }
    );

export const getDataReviewsOpenFilm = createAsyncThunk<Review[], number, {dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'film/fetchReviews',
    async (id:number, {dispatch, extra:api}) => {
      const routeReviews = APIRoute.Comments.replace('{filmId}', `${id}`);
      const {data} = await api.get<Review[]>(routeReviews);
      return data;
    }
  );

export const postReviveAction = createAsyncThunk<Review[], ToPostReviveData, {dispatch:AppDispatch,
    state: State, extra:AxiosInstance}> (
      'film/postRevive',
      async ({comment, rating, id}, {dispatch, extra:api}) => {
        const route = APIRoute.Comments.replace('{filmId}', `${id}`);
        const {data} = await api.post<Review[]>(route, {'comment':comment, 'rating':rating});
        dispatch(getDataReviewsOpenFilm(id));
        return data;
      }
    );

export const fetchFavoriteFilmAction = createAsyncThunk<Film[], undefined, {dispatch:AppDispatch,
      state: State, extra:AxiosInstance}>(
        'film/fetchFavoriteFilms',
        async (_arg, {dispatch, extra:api}) => {
          const {data} = await api.get<ServerFilm[]>(APIRoute.FavoriteFilms);
          const favoriteFilms:Film[] = await data.map((film:ServerFilm)=>serverToFilms(film));
          return favoriteFilms;
        }
      );

export const postFavoriteFilmAction = createAsyncThunk<{ film: Film; films: Film[]; favoriteFilms: Film[];}, favoriteDataPost, { dispatch:AppDispatch,
    state:State, extra:AxiosInstance}>(
      'film/postFavorite',
      async ({filmId, status}:favoriteDataPost, {dispatch, extra:api} ) => {
        const route = APIRoute.PostFavorite.replace('{filmId}/{status}', `${filmId}/${Number(status)}`);
        const {data} = await api.post(route);
        const filmChangFavorite:Film = serverToFilms(data);
        const filmsServer = await api.get<ServerFilm[]>(APIRoute.Films);
        const films:Film[] = await filmsServer.data.map((film:ServerFilm)=>serverToFilms(film));
        const favorite = await api.get<ServerFilm[]>(APIRoute.FavoriteFilms);
        const favoriteFilms:Film[] = await favorite.data.map((film:ServerFilm)=>serverToFilms(film))
        return {film:filmChangFavorite, films, favoriteFilms};
      }
    );

export const checkAutAction = createAsyncThunk<void, undefined, { dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'user/checkAut',
    async (_arg, {dispatch, extra:api}) => {
      await api.get(APIRoute.Login);
    }

  );

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
  }>(
    'user/login',
    async ({login:email, password}, {dispatch, extra:api})=> {
      const {data:{token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
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

