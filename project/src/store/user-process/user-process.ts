import { createSlice } from '@reduxjs/toolkit';
import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/store';
import { checkAutAction, loginAction, logoutAction } from '../api-action';

const initialState:UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  isErrorAuth:false,
};

export const userProcess = createSlice({
  name: NameSpace.USER,
  initialState,
  reducers:{},
  extraReducers(builder) {
    builder
      .addCase(checkAutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAutAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isErrorAuth = false;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isErrorAuth = true;

      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  }
});
