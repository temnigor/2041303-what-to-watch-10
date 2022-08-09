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
import { useAppSelector } from '../../hooks';
import { LoadingScreen } from '../loading-screen/loading-screen';

function App(): JSX.Element {
  const {authorizationStatus, allFilms} = useAppSelector((state)=>state);
  if(authorizationStatus === AuthorizationStatus.Unknown || allFilms.length === 0) {
    return <LoadingScreen/>;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path= {AppRoute.Main}
          element = {<Main />}
        />
        <Route
          path= {AppRoute.SignIn}
          element = {<SignIn/>}
        />
        <Route
          path= {AppRoute.MyList}
          element = {
            <PrivateRoute
              authorizationStatus = {authorizationStatus}
            >
              <MyList/>
            </PrivateRoute>
          }
        />
        <Route
          path= {AppRoute.Film}
          element = {<MoviePage/>}
        />
        <Route
          path= {AppRoute.AddReview}
          element = {
            <PrivateRoute authorizationStatus= {authorizationStatus}>
              <AddReview />
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
          path= {AppRoute.OtherRoute}
          element= {<Error404/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
