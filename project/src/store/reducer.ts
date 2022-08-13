import { createReducer } from '@reduxjs/toolkit';
import { FilterMainNavMenu, GenresFilter } from '../const';
import { Film } from '../types/film';
import {
  loadOpenFilm,
  getUserNameAction,
  loadFilms,
  mainFilterChang,
  requireAuthorizationStatus,
  setErrorLoginAction,
  loadingPageAction,
  loadSimilarFilms,
  loadReviews,
  isErrorResponseAction,
} from './action';
import { AuthorizationStatus } from '../const';
import { Reviews } from '../types/review';

 type InitialState = {
  filter:string,
  filmsFiltered:Film[],
  allFilms:Film[],
  openedFilm:Film | undefined,
  authorizationStatus: string,
  isErrorAuth:boolean,
  isErrorResponse:boolean,
  isLoadingFilms:boolean,
  userName:string,
  similarFilms:Film[],
  reviews:Reviews[]
}

const initialState:InitialState = {
  filter:GenresFilter[FilterMainNavMenu.ALL_GENRES],
  filmsFiltered:[],
  allFilms:[],
  similarFilms:[],
  openedFilm: undefined,
  userName:'',
  authorizationStatus: AuthorizationStatus.Unknown,
  isErrorAuth:false,
  isErrorResponse:false,
  isLoadingFilms:true,
  reviews:[]
};

const reducerMainFilterFilm = createReducer(initialState, (builder) => {
  builder
    .addCase(mainFilterChang, (state, action) => {
      state.filter = action.payload;
      GenresFilter[FilterMainNavMenu.ALL_GENRES] === action.payload
        ? state.filmsFiltered = state.allFilms
        : state.filmsFiltered = state.allFilms.filter((film:Film)=> film.genre === action.payload);
    })
    .addCase(loadFilms, (state, action) => {
      state.allFilms = action.payload;
      state.filmsFiltered = action.payload;
    })
    .addCase(requireAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setErrorLoginAction, (state, action) => {
      state.isErrorAuth = action.payload;
    })
    .addCase(loadingPageAction, (state, action) => {
      state.isLoadingFilms = action.payload;
    })
    .addCase(getUserNameAction, (state, action) => {
      state.userName = action.payload;
    })
    .addCase(loadOpenFilm, (state, action) => {
      state.openedFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(isErrorResponseAction, (state, action) => {
      state.isErrorResponse = action.payload;
    });
});

export {reducerMainFilterFilm};
