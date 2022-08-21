import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/store';
import { checkAutAction, loginAction, logoutAction } from '../api-action';

const initialState:UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userName:'',
  isErrorAuth:false,
};

export const userProcess = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(checkAutAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload;
      })
      .addCase(checkAutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userName = '';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userName = action.payload;
        state.isErrorAuth = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userName = '';
        state.isErrorAuth = true;

      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
