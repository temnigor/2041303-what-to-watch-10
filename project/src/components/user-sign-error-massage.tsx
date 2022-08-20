import { useAppSelector } from '../hooks';
import {getIsErrorAuth } from '../store/user-process/selectors';

export function UserSignErrorMassage ():JSX.Element | null {
  const isErrorAuth = useAppSelector(getIsErrorAuth);
  return(isErrorAuth) ?
    <div className="sign-in__message">
      <p>We can’t recognize this email <br/> and password combination. Please try again.</p>
    </div>
    : null;
}
