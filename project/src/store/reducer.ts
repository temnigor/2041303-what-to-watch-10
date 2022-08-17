import { createReducer } from '@reduxjs/toolkit';
import { FilterMainNavMenu, GenresFilter } from '../const';
import { Film } from '../types/film';
import {
  loadOpenFilm,
  loadFilms,
  mainFilterChangAction,
  loadingPageAction,
  loadSimilarFilms,
  loadReviews,
  isErrorResponseAction,
  filmFilterCountAction,
  loadFavoriteFilms,
} from './action';
import { Review } from '../types/review';

 type InitialState = {
  filter:string,
  filmFilterCount:number,
  allFilms:Film[],
  favoriteFilms:Film[],
  openedFilm:Film | undefined,
  isErrorResponse:boolean,
  isLoadingFilms:boolean,
  similarFilms:Film[],
  reviews:Review[]
}

const initialState:InitialState = {
  filter:GenresFilter[FilterMainNavMenu.ALL_GENRES],
  filmFilterCount:0,
  allFilms:[],
  similarFilms:[],
  favoriteFilms:[],
  openedFilm: undefined,
  isErrorResponse:false,
  isLoadingFilms:true,
  reviews:[]
};

const reducerMainFilterFilm = createReducer(initialState, (builder) => {
  builder
    .addCase(mainFilterChangAction, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(filmFilterCountAction, (state, action) => {
      state.filmFilterCount = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.allFilms = action.payload;
    })
    .addCase(loadingPageAction, (state, action) => {
      state.isLoadingFilms = action.payload;
    })
    .addCase(loadOpenFilm, (state, action) => {
      state.openedFilm = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(isErrorResponseAction, (state, action) => {
      state.isErrorResponse = action.payload;
    });
});

export {reducerMainFilterFilm};
