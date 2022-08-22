import { combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import {dataAPIProcess} from './data-api-process/data-api-process';
import { filterProcess } from './filter-process/filter-process';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpace.DATA]:dataAPIProcess.reducer,
  [NameSpace.FILTER]:filterProcess.reducer,
  [NameSpace.USER]:userProcess.reducer
});

