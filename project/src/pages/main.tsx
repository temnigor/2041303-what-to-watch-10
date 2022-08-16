import ArtBoard from '../components/art-board';
import Logo from '../components/logo/logo';
import { MainGenreMenu } from '../components/main-genre-menu';
import { useEffect, useState } from 'react';
import { MainCatalogFilmCards } from '../components/main-catalog-film';
import { BigFilmCard } from '../components/big-film-card';
import { MainShowMoreButton } from '../components/main-show-more-button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { loadOpenFilm } from '../store/action';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import { CatalogFilmCardsInterface } from '../components/catalog-film-card/catalog-film-cards-interface';
import { CatalogFilm } from '../const';

const FILM_CARD_COUNT = 8;

function Main ():JSX.Element {
  const [sliceEnd, setSliceEnd] = useState(FILM_CARD_COUNT);
  const {allFilms, openedFilm, authorizationStatus} = useAppSelector((state)=>state)
  const [filmCount, setFilmCount] = useState(allFilms.length);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(openedFilm === undefined || openedFilm.id !== allFilms[0].id){
      dispatch(loadOpenFilm(allFilms[0]));
    }
  }, [dispatch, openedFilm, allFilms]);
  if(openedFilm === undefined || openedFilm.id !== allFilms[0].id){
    return <LoadingScreen/>
  }

  return (
    <div>
      <ArtBoard/>
      <section className="film-card">
      <BigFilmCard
        film={openedFilm}
        allFilms = {allFilms}
        authorizationStatus= {authorizationStatus}
      />
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MainGenreMenu/>
          <CatalogFilmCardsInterface
            catalogFilter={CatalogFilm.GENRE_FILTER}
            sliceEnd={sliceEnd}
            setFilmCount={(slice:number)=>setFilmCount(slice)}
          />
          <MainShowMoreButton
            sliceEnd={sliceEnd}
            setSlice={(slice:number)=>setSliceEnd(slice)}
            filmCount={filmCount}
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
