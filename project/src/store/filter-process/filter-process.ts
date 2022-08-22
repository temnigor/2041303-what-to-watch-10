import { createSlice } from '@reduxjs/toolkit';
import { FilterMainNavMenu, GenresFilter, NameSpace, NavMenuMoviePage } from '../../const';
import { FilterProcess } from '../../types/store';

const initialState:FilterProcess = {
  filter:GenresFilter[FilterMainNavMenu.ALL_GENRES],
  filmFilterCount:0,
  tabsMeaning:NavMenuMoviePage.OVERVIEW
};

export const filterProcess = createSlice({
  name:NameSpace.FILTER,
  initialState,
  reducers: {
    mainFilterChangAction(state, action) {
      state.filter = action.payload;
    },
    filmFilterCountAction(state, action) {
      state.filmFilterCount = action.payload;
    },
    tabsMeaningAction(state, action) {
      state.tabsMeaning = action.payload;
    }
  }
});

export const {mainFilterChangAction, filmFilterCountAction, tabsMeaningAction} = filterProcess.actions;
