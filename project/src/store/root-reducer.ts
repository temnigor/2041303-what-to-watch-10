import { combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import {dataAPIProcess} from './data-api-process/data-api-process';
import { filterProcess } from './filter-process/filter-process';
import { userProcess } from './user-process/user-process';


export const rootReducer = combineReducers({
  [NameSpace.Data]:dataAPIProcess.reducer,
  [NameSpace.Filter]:filterProcess.reducer,
  [NameSpace.User]:userProcess.reducer
});

