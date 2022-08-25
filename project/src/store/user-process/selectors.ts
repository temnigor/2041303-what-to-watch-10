import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getAuthorizationStatus = (state:State):string => state[NameSpace.User].authorizationStatus;
const getIsErrorAuth = (state:State):boolean => state[NameSpace.User].isErrorAuth;

export {
  getAuthorizationStatus,
  getIsErrorAuth,
};
