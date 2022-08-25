import { createSlice } from '@reduxjs/toolkit';
import { ALL_GENRE, NameSpace, NavMenuMoviePage } from '../../const';
import { FilterProcess } from '../../types/store';

const initialState:FilterProcess = {
  filter:ALL_GENRE,
  filmFilterCount:0,
  tabsMeaning:NavMenuMoviePage.Overview
};

export const filterProcess = createSlice({
  name:NameSpace.Filter,
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
