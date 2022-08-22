import { NameSpace } from '../../const';
import { State } from '../../types/store';

const getAuthorizationStatus = (state:State):string => state[NameSpace.USER].authorizationStatus;
const getIsErrorAuth = (state:State):boolean => state[NameSpace.USER].isErrorAuth;

export {
  getAuthorizationStatus,
  getIsErrorAuth,
};
