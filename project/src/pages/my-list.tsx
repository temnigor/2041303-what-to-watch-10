import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import ArtBoard from '../components/art-board/art-board';
import { CatalogFilmCardsInterface } from '../components/catalog-film-card/catalog-film-cards-interface';
import Logo from '../components/logo/logo';
import { UserSign } from '../components/user-sign/user-sign';
import { AppRoute, CatalogFilm } from '../const';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchFavoriteFilmAction } from '../store/api-action';
import { getFavoriteFilms, getIsErrorResponse } from '../store/data-api-process/selectors';

function MyList () {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(favoriteFilms === undefined){
      dispatch(fetchFavoriteFilmAction());
    }
  }, [dispatch, favoriteFilms]);
  if(isErrorResponse){
    return <Navigate to={AppRoute.Error}/>;
  }
  return (
    <div>
      <ArtBoard/>
      <div className ="user-page">
        <header className ="page-header user-page__head">
          <Logo/>
          <h1 className ="page-title user-page__title">My list <span className ="user-page__film-count">9</span></h1>
          <ul className ="user-block">
            <UserSign />
          </ul>
        </header>
        <section className ="catalog">
          <h2 className ="catalog__title visually-hidden">Catalog</h2>
          <CatalogFilmCardsInterface catalogFilter={CatalogFilm.FAVORITE_FILTER}/>
        </section>
        <footer className ="page-footer">
          <Logo footer/>
          <div className ="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default MyList;
