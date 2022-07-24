import { Link } from 'react-router-dom';
import { AuthorizationStatus } from '../const';
import { AppRoute } from '../const';
type UserSingProps = {
  status:string
}
function UserSing (props:UserSingProps):JSX.Element {
  if(props.status === AuthorizationStatus.Auth ) {
    return(
      <ul className ="user-block">
        <li className ="user-block__item">
          <div className ="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
          </div>
        </li>
        <li className ="user-block__item">
          <Link className ="user-block__link" to = {AppRoute.SignIn}>Sign out</Link>
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

export {UserSing};
