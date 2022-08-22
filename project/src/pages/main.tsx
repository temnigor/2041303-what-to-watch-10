import ArtBoard from '../components/art-board/art-board';
import Logo from '../components/logo/logo';

import { useEffect, useState } from 'react';
import { BigFilmCard } from '../components/big-film-card/big-film-card';

import { useAppDispatch, useAppSelector } from '../hooks';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import { CatalogFilmCardsInterface } from '../components/catalog-film-card/catalog-film-cards-interface';
import { AppRoute, CatalogFilm } from '../const';
import { getAllFilms, getIsErrorResponse, getOpenedFilms } from '../store/data-api-process/selectors';
import { loadOpenFilm } from '../store/data-api-process/data-api-process';
import { MainGenreMenu } from '../components/main-components/main-genre-menu';
import { MainShowMoreButton } from '../components/main-components/main-show-more-button';
import { Navigate } from 'react-router-dom';

const FILM_CARD_COUNT = 8;

function Main ():JSX.Element {
  const [sliceEnd, setSliceEnd] = useState(FILM_CARD_COUNT);
  const allFilms = useAppSelector(getAllFilms);
  const openedFilm = useAppSelector(getOpenedFilms);
  const errorResponse = useAppSelector(getIsErrorResponse);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(openedFilm === undefined || openedFilm.id !== allFilms[0].id){
      dispatch(loadOpenFilm(allFilms[0]));
    }
  }, [dispatch, openedFilm, allFilms]);
  if(openedFilm === undefined || openedFilm.id !== allFilms[0].id){
    if(errorResponse){
      return <Navigate to={AppRoute.Error}/>;
    }
    return <LoadingScreen/>;
  }
  return (
    <div>
      <ArtBoard/>
      <section className="film-card">
        {<BigFilmCard
          film={openedFilm}
        />}
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MainGenreMenu/>
          <CatalogFilmCardsInterface
            catalogFilter={CatalogFilm.GENRE_FILTER}
            sliceEnd={sliceEnd}
          />
          <MainShowMoreButton
            sliceEnd={sliceEnd}
            setSlice={(slice:number)=>setSliceEnd(slice)}
          />
        </section>
        <footer className="page-footer">
          <Logo footer />
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Main;
