import ArtBoard from '../components/art-board/art-board';
import Logo from '../components/logo/logo';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { CollectionFilmCardCatalog } from '../components/catalog-film-card/collection-catalog-film-card';
import { CatalogFilm, TIME_CLEAR_ERROR } from '../const';
import { getIsErrorResponse, getPromoFilm } from '../store/data-api-process/selectors';
import { MainGenreMenu } from '../components/main-components/main-genre-menu';
import { MainShowMoreButton } from '../components/main-components/main-show-more-button';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import { BigFilmCard } from '../components/big-film-card/big-film-card-components';
import { setIsErrorResponseAction } from '../store/data-api-process/data-api-process';
import { ErrorLoading } from '../components/error-loading/error-loading';

const FILM_CARD_COUNT = 8;

function Main ():JSX.Element {
  const [sliceEnd, setSliceEnd] = useState(FILM_CARD_COUNT);
  const promoFilm = useAppSelector(getPromoFilm);
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(isErrorResponse){
      setTimeout(()=>dispatch(setIsErrorResponseAction(false)), TIME_CLEAR_ERROR);
    }
  });
  if(promoFilm === undefined){
    return<LoadingScreen/>;
  }
  return (
    <div>
      <ArtBoard/>
      {isErrorResponse && <ErrorLoading/>}
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
