import ArtBoard from '../components/art-board/art-board';
import Logo from '../components/logo/logo';
import { useState } from 'react';
import { useAppSelector } from '../hooks';
import { CollectionFilmCardCatalog } from '../components/catalog-film-card/catalog-film-cards-interface';
import { AppRoute, CatalogFilm } from '../const';
import { getIsErrorResponse, getPromoFilm } from '../store/data-api-process/selectors';
import { MainGenreMenu } from '../components/main-components/main-genre-menu';
import { MainShowMoreButton } from '../components/main-components/main-show-more-button';
import { Navigate } from 'react-router-dom';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import { BigFilmCard } from '../components/big-film-card/big-film-card-components';

const FILM_CARD_COUNT = 8;

function Main ():JSX.Element {
  const [sliceEnd, setSliceEnd] = useState(FILM_CARD_COUNT);
  const promoFilm = useAppSelector(getPromoFilm);
  const errorResponse = useAppSelector(getIsErrorResponse);
  if(errorResponse && promoFilm === undefined){
    return <Navigate to={AppRoute.Error}/>;
  }
  if(promoFilm === undefined){
    return<LoadingScreen/>;
  }
  return (
    <div>
      <ArtBoard/>
      <section className="film-card">
        {
          <BigFilmCard
            film={promoFilm}
          />
        }
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MainGenreMenu
            setSlice={(slice:number)=>setSliceEnd(slice)}
          />
          <CollectionFilmCardCatalog
            catalogFilter={CatalogFilm.GenreFilter}
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
