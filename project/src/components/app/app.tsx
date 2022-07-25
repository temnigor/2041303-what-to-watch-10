import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../../pages/main';
import Error404 from '../../pages/error-404';
import AddReview from '../../pages/add-review';
import SignIn from '../../pages/sign-in';
import Player from '../../pages/player';
import MyList from '../../pages/my-list';
import MoviePage from '../../pages/movie-page';
import PrivateRoute from '../private-route/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Film } from '../../types/film';
import { Review } from '../../types/review';
type AppScreenProps = {
  films:Film[],
  reviews:Review[]
}
const AuthorizationStatusNow = {
  status: AuthorizationStatus.Auth,
  name:'Robin'
};


function App( props:AppScreenProps ): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path= {AppRoute.Main}
          element = {<Main films = {props.films} AuthorizationStatus = {AuthorizationStatusNow.status} />}
        />
        <Route
          path= {AppRoute.SignIn}
          element = {<SignIn/>}
        />
        <Route
          path= {AppRoute.MyList}
          element = {
            <PrivateRoute
              authorizationStatus = {AuthorizationStatusNow.status}
            >
              <MyList films = {props.films}/>
            </PrivateRoute>
          }
        />
        <Route
          path= {AppRoute.Film}
          element = {<MoviePage authorizationStatus= {AuthorizationStatusNow.status} films = {props.films} reviews = {props.reviews} />}
        />
        <Route
          path= {AppRoute.AddReview}
          element = {
            <PrivateRoute authorizationStatus= {AuthorizationStatusNow.status}>
              <AddReview authorizationStatus= {AuthorizationStatusNow.status} name={AuthorizationStatusNow.name} films = {props.films}/>
            </PrivateRoute>
          }
        />
        <Route
          path= {AppRoute.Player}
          element = {<Player />}
        />
        <Route
          path= {AppRoute.Error}
          element= {<Error404/>}
        />
        <Route
          path= {AppRoute.OtherError}
          element= {<Error404/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
