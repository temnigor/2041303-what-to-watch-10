import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { DataAPIProcess } from '../../types/store';
import {
  fetchFavoriteFilmAction,
  fetchFilmsActions,
  fetchPromoFilmAction,
  getDataOpenFilmAction,
  getDataReviewsOpenFilm,
  getDataSimilarFilmsAction,
  postFavoriteFilmAction,
  postReviveAction } from '../api-action';


const initialState:DataAPIProcess = {
  allFilms:[],
  similarFilms:[],
  favoriteFilms:[],
  openedFilm: undefined,
  promoFilm:undefined,
  isErrorResponse:false,
  isLoadingFilms:true,
  reviews:[],
};

export const dataAPIProcess = createSlice({
  name:NameSpace.Data,
  initialState,
  reducers:{
    loadOpenFilm(state, action) {
      state.openedFilm = action.payload;
    },
    setIsErrorResponseAction(state, action) {
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
      .addCase(fetchPromoFilmAction.pending, (state)=>{
        state.isLoadingFilms = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.isLoadingFilms = false;
        state.promoFilm = action.payload;
      })
      .addCase(fetchPromoFilmAction.rejected, (state)=>{
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
      .addCase(postReviveAction.fulfilled, (state, action) => {
        state.reviews = action.payload.review;
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
        state.isLoadingFilms = false;
      })
      .addCase(postFavoriteFilmAction.fulfilled, (state, action) => {
        const{isFavorite, favoriteFilms, isPromoFilm} = action.payload;
        state.favoriteFilms = favoriteFilms;
        if(state.openedFilm !== undefined && !isPromoFilm){
          state.openedFilm.isFavorite = isFavorite;
        }
        if(isPromoFilm && state.promoFilm !== undefined){
          state.promoFilm.isFavorite = isFavorite;
        }
      });
  }
});

export const {loadOpenFilm, setIsErrorResponseAction} = dataAPIProcess.actions;
