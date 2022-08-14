import { Navigate } from 'react-router-dom';
import { AuthorizationStatus, AppRoute } from '../../const';

type PrivateRouteProps = {
authorizationStatus:string,
children:JSX.Element
}

function PrivateRoute ({authorizationStatus, children}:PrivateRouteProps) {
  return authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.SignIn}/>;
}
export default PrivateRoute;
