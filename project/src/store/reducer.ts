import { createReducer } from '@reduxjs/toolkit';
import { FilterMainNavMenu, GenresFilter } from '../const';
import { getFilms } from '../mocks/films';
import {mainFilterChang } from './action';

const initialState = {
  filter:GenresFilter[FilterMainNavMenu.ALL_GENRES],
  filmsFiltered: getFilms(),
  allFilms: getFilms()
};

const reducerMainFilterFilm = createReducer(initialState, (builder) => {
  builder
    .addCase(mainFilterChang, (state, action) => {
      state.filter = action.payload;
      GenresFilter[FilterMainNavMenu.ALL_GENRES] === action.payload
        ? state.filmsFiltered = state.allFilms
        : state.filmsFiltered = state.allFilms.filter((film)=> film.genre === action.payload);
    });
});

export {reducerMainFilterFilm};
