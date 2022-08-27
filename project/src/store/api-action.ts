import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute} from '../const';
import { AppDispatch, AuthData, FavoriteDataPost, FavoriteDataPostArg, State, ToPostReviveData, UserData } from '../types/store';
import { Film, ServerFilm } from '../types/film';
import { removeToken, saveToken } from '../services/token';
import { Review } from '../types/review';
import { redirectRouteTo } from './action';

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
export const fetchPromoFilmAction = createAsyncThunk<Film|undefined, undefined, { dispatch: AppDispatch,
state: State, extra:AxiosInstance}>(
  'data/fetchPromoFilm',
  async (_arg, {dispatch, extra:api}) => {
    const {data} = await api.get<ServerFilm>(APIRoute.PromoFilm);
    const promoFilm = await serverToFilms(data);
    return promoFilm;
  }
);

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

export const postReviveAction = createAsyncThunk<{review:Review[]; filmId: string;}, ToPostReviveData, {dispatch:AppDispatch,
    state: State, extra:AxiosInstance}> (
      'film/postRevive',
      async ({comment, rating, id}, {dispatch, extra:api}) => {
        const route = APIRoute.Comments.replace('{filmId}', `${id}`);
        const {data} = await api.post<Review[]>(route, {'comment':comment, 'rating':rating});
        dispatch(redirectRouteTo(APIRoute.OneFilm.replace('{filmId}', `${id}`)));
        return {review:data, filmId:`${id}`};
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

export const postFavoriteFilmAction = createAsyncThunk<FavoriteDataPostArg, FavoriteDataPost, { dispatch:AppDispatch,
    state:State, extra:AxiosInstance}>(
      'film/postFavorite',
      async ({filmId, status, isPromoFilm}:FavoriteDataPost, {dispatch, extra:api} ) => {
        const route = APIRoute.PostFavorite.replace('{filmId}/{status}', `${filmId}/${Number(status)}`);
        const {data:{isFavorite}} = await api.post(route);
        const favorite = await api.get<ServerFilm[]>(APIRoute.FavoriteFilms);
        const favoriteFilms:Film[] = await favorite.data.map((film:ServerFilm)=>serverToFilms(film));
        return {favoriteFilms, isFavorite, isPromoFilm};
      }
    );

export const checkAuthAction = createAsyncThunk<string, undefined, { dispatch:AppDispatch,
  state: State, extra:AxiosInstance}>(
    'user/checkAut',
    async (_arg, {dispatch, extra:api}) => {
      const {data:{avatarUrl}} = await api.get(APIRoute.Login);
      return avatarUrl;
    }

  );

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
  }>(
    'user/login',
    async ({login:email, password}, {dispatch, extra:api})=> {
      const {data:{token, avatarUrl}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      return avatarUrl;
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

