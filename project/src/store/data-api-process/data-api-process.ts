import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataAPIProcess } from '../../types/store';
import { fetchFavoriteFilmAction, fetchFilmsActions, getDataOpenFilmAction, getDataReviewsOpenFilm, getDataSimilarFilmsAction, postFavoriteFilmAction, postReviveAction } from '../api-action';

const initialState:DataAPIProcess = {
  allFilms:[],
  similarFilms:[],
  favoriteFilms:[],
  openedFilm: undefined,
  isErrorResponse:false,
  isLoadingFilms:true,
  reviews:[]
};

export const dataAPIProcess = createSlice({
  name:NameSpace.DATA,
  initialState,
  reducers:{
    loadOpenFilm(state, action) {
      state.openedFilm = action.payload;
    },
    isErrorResponseAction(state, action) {
      state.isErrorResponse = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsActions.pending, (state) => {
        state.isLoadingFilms = true;
      })
      .addCase(fetchFilmsActions.fulfilled, (state, action) => {
        state.allFilms = action.payload;
        state.isLoadingFilms = false;
        state.isErrorResponse = false;
      })
      .addCase(fetchFilmsActions.rejected, (state) => {
        state.allFilms = [];
        state.isLoadingFilms = false;
        state.isErrorResponse = true;
      })
      .addCase(getDataOpenFilmAction.pending, (state) => {
        state.isLoadingFilms = true;
      })
      .addCase(getDataOpenFilmAction.fulfilled, (state, action) => {
        state.openedFilm = action.payload;
        state.isErrorResponse = false;
        state.isLoadingFilms = false;
      })
      .addCase(getDataOpenFilmAction.rejected, (state) => {
        state.openedFilm = undefined;
        state.isErrorResponse = true;
        state.isLoadingFilms = false;
      })
      .addCase(getDataSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isLoadingFilms = false;
      })
      .addCase(getDataReviewsOpenFilm.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(postReviveAction.fulfilled, (state) => {
        state.isErrorResponse = false;
      })
      .addCase(postReviveAction.rejected, (state) => {
        state.isErrorResponse = true;
      })
      .addCase(fetchFavoriteFilmAction.pending, (state) => {
        state.isLoadingFilms = true;
      })
      .addCase(fetchFavoriteFilmAction.fulfilled, (state, action) => {
        state.isErrorResponse = false;
        state.favoriteFilms = action.payload;
        state.isLoadingFilms = false;
      })
      .addCase(fetchFavoriteFilmAction.rejected, (state) => {
        state.isErrorResponse = true;
        state.isLoadingFilms = false;
      })
      .addCase(postFavoriteFilmAction.fulfilled, (state, action) => {
        const{film, films} = action.payload;
        state.openedFilm = film;
        state.allFilms = films;
      });
  },
});
export const {loadOpenFilm, isErrorResponseAction} = dataAPIProcess.actions;
