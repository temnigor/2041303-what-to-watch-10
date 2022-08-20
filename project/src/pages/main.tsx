import ArtBoard from '../components/art-board';
import Logo from '../components/logo/logo';
import { MainGenreMenu } from '../components/main-genre-menu';
import { useEffect, useState } from 'react';
import { BigFilmCard } from '../components/big-film-card';
import { MainShowMoreButton } from '../components/main-show-more-button';
import { useAppDispatch, useAppSelector } from '../hooks';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import { CatalogFilmCardsInterface } from '../components/catalog-film-card/catalog-film-cards-interface';
import { CatalogFilm } from '../const';
import { getAllFilms, getOpenedFilms } from '../store/data-api-process/selectors';
import { loadOpenFilm } from '../store/data-api-process/data-api-process';

const FILM_CARD_COUNT = 8;

function Main ():JSX.Element {
  const [sliceEnd, setSliceEnd] = useState(FILM_CARD_COUNT);
  const allFilms = useAppSelector(getAllFilms);
  const openedFilm = useAppSelector(getOpenedFilms);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(openedFilm === undefined || openedFilm.id !== allFilms[0].id){
      dispatch(loadOpenFilm(allFilms[0]));
    }
  }, [dispatch, openedFilm, allFilms]);
  if(openedFilm === undefined || openedFilm.id !== allFilms[0].id){
    return <LoadingScreen/>;
  }

  return (
    <div>
      <ArtBoard/>
      <section className="film-card">
        <BigFilmCard
          film={openedFilm}
          allFilms = {allFilms}
        />
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
