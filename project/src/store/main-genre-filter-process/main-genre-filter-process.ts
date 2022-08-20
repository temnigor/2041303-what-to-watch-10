import { createSlice } from '@reduxjs/toolkit';
import { FilterMainNavMenu, GenresFilter, NameSpace } from '../../const';
import { MainGenreFilterProcess } from '../../types/store';

const initialState:MainGenreFilterProcess = {
  filter:GenresFilter[FilterMainNavMenu.ALL_GENRES],
  filmFilterCount:0,
};

export const mainGenreFilterProcess = createSlice({
  name:NameSpace.MAIN,
  initialState,
  reducers: {
    mainFilterChangAction(state, action) {
      state.filter = action.payload;
    },
    filmFilterCountAction(state, action) {
      state.filmFilterCount = action.payload;
    }
  }
});

export const {mainFilterChangAction, filmFilterCountAction} = mainGenreFilterProcess.actions;
