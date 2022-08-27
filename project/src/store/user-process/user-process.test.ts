import { AuthorizationStatus } from '../../const';
import { UserProcess } from '../../types/store';
import { checkAuthAction, loginAction, logoutAction } from '../api-action';
import { userProcess } from './user-process';

describe('Reducer: userProcess', ()=>{
  let state : UserProcess;
  beforeEach(()=>{
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      avatarUrl:'',
      isErrorAuth:false
    };
  });
  it('authorization check if success authorization status Auth', ()=>{
    expect(userProcess.reducer(state, {type:checkAuthAction.fulfilled.type, action:'some src'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        avatarImg:'some src',
        isErrorAuth:false
      });
  });
  it('authorization check if reject authorization status NoAuth isError false', ()=>{
    expect(userProcess.reducer(state, {type:checkAuthAction.rejected.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorAuth:false
      });
  });
  it('login if fulfilled authorization status Auth isError false', ()=>{
    expect(userProcess.reducer(state, {type:loginAction.fulfilled.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        isErrorAuth:false
      });
  });
  it('login if reject authorization status NoAuth isError true', ()=>{
    expect(userProcess.reducer(state, {type:loginAction.rejected.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorAuth:true
      });
  });
  it('logout if fulfilled authorization status NoAuth', ()=>{
    expect(userProcess.reducer(state, {type:logoutAction.fulfilled.type}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        isErrorAuth:false
      });
  });
});
