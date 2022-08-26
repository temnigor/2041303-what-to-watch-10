import { AppRoute, AuthorizationStatus} from '../../const';
import Main from '../../pages/main';
import Error404 from '../../pages/error-404';
import AddReview from '../../pages/add-review';
import SignIn from '../../pages/sign-in';
import Player from '../../pages/player';
import MyList from '../../pages/my-list';
import PrivateRoute from '../private-route/private-route';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { LoadingScreen } from '../loading-screen/loading-screen';
import { getIsLoadingFilms, getPromoFilm } from '../../store/data-api-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { MoviePage } from '../../pages/movie-page';
import { useEffect } from 'react';
import { fetchFavoriteFilmAction } from '../../store/api-action';
import { setIsErrorResponseAction } from '../../store/data-api-process/data-api-process';


function App(): JSX.Element {
  const isLoadingFilms = useAppSelector(getIsLoadingFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const dispatch = useAppDispatch();
  const location = useLocation();
  useEffect(()=>{
    dispatch(setIsErrorResponseAction(false));
    if(authorizationStatus === AuthorizationStatus.Auth){
      dispatch(fetchFavoriteFilmAction());
    }
  },[dispatch, authorizationStatus, location]);

  if(isLoadingFilms || authorizationStatus === AuthorizationStatus.Unknown || promoFilm === undefined) {
    return <LoadingScreen/>;
  }
  return (
    <Routes>
      <Route
        path={AppRoute.Main}
        element ={<Main />}
      />
      <Route
        path= {AppRoute.SignIn}
        element ={<SignIn/>}
      />
      <Route
        path= {AppRoute.MyList}
        element ={
          <PrivateRoute
            authorizationStatus={authorizationStatus}
          >
            <MyList/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Film}
        element={<MoviePage/>}
      />

      <Route
        path= {AppRoute.AddReview}
        element ={
          <PrivateRoute authorizationStatus={authorizationStatus}>
            <AddReview/>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Player}
        element ={<Player />}
      />
      <Route
        path={AppRoute.Error}
        element={<Error404/>}
      />
      <Route
        path={AppRoute.OtherRoute}
        element={<Error404/>}
      />
    </Routes>
  );
}

export default App;
