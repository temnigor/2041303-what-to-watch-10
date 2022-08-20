import { combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import {dataAPIProcess} from './data-api-process/data-api-process';
import { mainGenreFilterProcess } from './main-genre-filter-process/main-genre-filter-process';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpace.DATA]:dataAPIProcess.reducer,
  [NameSpace.MAIN]:mainGenreFilterProcess.reducer,
  [NameSpace.USER]:userProcess.reducer
});

