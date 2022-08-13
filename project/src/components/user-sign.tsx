
import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { logoutAction } from '../store/api-action';

function UserSign ():JSX.Element {
  const{authorizationStatus} = useAppSelector((state)=>state);
  const dispatch = useAppDispatch();
  if(authorizationStatus === AuthorizationStatus.Auth ) {
    return(
      <ul className ="user-block">
        <li className ="user-block__item">
          <div className ="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className ="user-block__item">
          <a href='#top' onClick={(evt:MouseEvent<HTMLAnchorElement>)=>{
            evt.preventDefault();
            dispatch(logoutAction());}}
          className="user-block__link"
          >
              Sign out
          </a>
        </li>
      </ul>
    );
  }
  return (
    <div className="user-block">
      <Link to = {AppRoute.SignIn} className="user-block__link">Sign in</Link>
    </div>
  );
}

export {UserSign};
