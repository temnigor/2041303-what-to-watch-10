import { createReducer } from '@reduxjs/toolkit';
import { FilterMainNavMenu, GenresFilter } from '../const';
import { Film } from '../types/film';
import {
  loadOneFilm,
  getUserNameAction,
  loadFilms,
  mainFilterChang,
  requireAuthorizationStatus,
  setErrorLoginAction,
  loadingPageAction,
  loadSimilarFilms,
} from './action';
import { AuthorizationStatus } from '../const';

 type InitialState = {
  filter:string,
  filmsFiltered:Film[],
  allFilms:Film[],
  oneFilm:Film[],
  authorizationStatus: string,
  error:boolean,
  loadingFilms:boolean,
  userName:string,
  similarFilms:Film[],
}

const initialState:InitialState = {
  filter:GenresFilter[FilterMainNavMenu.ALL_GENRES],
  filmsFiltered:[],
  allFilms:[],
  similarFilms:[],
  oneFilm:[],
  userName:'',
  authorizationStatus: AuthorizationStatus.Unknown,
  error:false,
  loadingFilms:true,
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
     .addCase(setErrorLoginAction, (state, action)=> {
      state.error = action.payload;
     })
     .addCase(loadingPageAction, (state, action) => {
      state.loadingFilms = action.payload;
     })
     .addCase(getUserNameAction, (state, action)=>{
      state.userName = action.payload;
     })
     .addCase(loadOneFilm, (state, action)=>{
      state.oneFilm[0] = action.payload;
     })
     .addCase(loadSimilarFilms, (state, action)=>{
      state.similarFilms = action.payload;
     })
});

export {reducerMainFilterFilm};
