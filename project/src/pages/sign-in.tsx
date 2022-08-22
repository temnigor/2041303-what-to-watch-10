import ArtBoard from '../components/art-board/art-board';
import Logo from '../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../hooks';
import { FormEvent, useRef, useState } from 'react';
import { AuthData } from '../types/store';
import { loginAction } from '../store/api-action';
import { Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../const';
import { getAuthorizationStatus } from '../store/user-process/selectors';
import { UserSignErrorValidateMassage } from '../components/user-sign-error/user-sign-error-validate-massage';
import { UserSignErrorMassage } from '../components/user-sign-error/user-sign-error-massage';

function SignIn () {
  const auth = useAppSelector(getAuthorizationStatus);
  const dispatch = useAppDispatch();
  const refInputEmail = useRef<HTMLInputElement| null>(null);
  const refInputPassword = useRef<HTMLInputElement| null>(null);
  const [isValid, setIsValid] = useState(true);
  const onSubmit = (AuthValue:AuthData):void => {dispatch(loginAction(AuthValue));};
  const onSubmitHandler = (evt:FormEvent<HTMLFormElement>):void => {
    evt.preventDefault();
    if(refInputEmail.current !== null && refInputPassword.current !== null) {
      if(refInputEmail.current.value.indexOf('@') === -1) {
        return setIsValid(false);
      }
      setIsValid(true);
      onSubmit({
        login: refInputEmail.current.value,
        password: refInputPassword.current.value
      });
    }
  };
  return auth !== AuthorizationStatus.Auth ? (
    <div>
      <ArtBoard/>
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo/>
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>
        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={onSubmitHandler} noValidate>
            <div className="sign-in__fields">
              {!isValid && <UserSignErrorValidateMassage/>}
              <UserSignErrorMassage/>
              <div className="sign-in__field">
                <input ref= {refInputEmail} className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
                <label className="sign-in__label visually-hidden" htmlFor= "user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input ref={refInputPassword} className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
                <label className="sign-in__label visually-hidden" htmlFor= "user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit" >Sign in</button>
            </div>
          </form>
        </div>
        <footer className="page-footer">
          <Logo footer/>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  ) : (
    <Navigate to={AppRoute.Main}/>
  );
}
export default SignIn;
