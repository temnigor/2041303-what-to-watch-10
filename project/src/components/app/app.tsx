import { AppRoute, AuthorizationStatus } from '../../const';
import Main from '../../pages/main';
import Error404 from '../../pages/error';
import AddReview from '../../pages/add-review';
import SignIn from '../../pages/sign-in';
import Player from '../../pages/player';
import MyList from '../../pages/my-list';
import MoviePage from '../../pages/movie-page';
import PrivateRoute from '../private-route/private-route';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
const TitleFilmModel = {
  name: 'The Grand Budapest Hotel',
  genre: 'Drama',
  year:  2014
};
function App( ): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path= {AppRoute.Main}
          element = {<Main {...TitleFilmModel}/>}
        />
        <Route
          path= {AppRoute.SignIn}
          element = {<SignIn/>}
        />
        <Route
          path= {AppRoute.MyList}
          element = {
            <PrivateRoute
              authorizationStatus = {AuthorizationStatus.NoAuth}
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
            <PrivateRoute authorizationStatus= {AuthorizationStatus.NoAuth}>
              <AddReview/>
            </PrivateRoute>
          }
        />
        <Route
          path= {AppRoute.Player}
          element = {<Player/>}
        />
        <Route
          path= {AppRoute.Error}
          element= {<Error404/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
