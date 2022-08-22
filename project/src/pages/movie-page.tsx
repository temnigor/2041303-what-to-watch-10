import { Navigate, useParams } from 'react-router-dom';
import {memo, useEffect} from 'react';
import ArtBoard from '../components/art-board/art-board';
import { AppRoute, CatalogFilm} from '../const';
import Logo from '../components/logo/logo';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getDataOpenFilmAction, getDataReviewsOpenFilm, getDataSimilarFilmsAction } from '../store/api-action';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
import { CatalogFilmCardsInterface } from '../components/catalog-film-card/catalog-film-cards-interface';
import { getIsErrorResponse, getOpenedFilms} from '../store/data-api-process/selectors';

import { MovieInfo } from '../components/movie-info/movie-info';

function MoviePageComponents ():JSX.Element {
  const dispatch = useAppDispatch();
  const openedFilm = useAppSelector(getOpenedFilms);
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const {id:idParam} = useParams();

  useEffect(() => {
    if(idParam){
      if(openedFilm === undefined || openedFilm.id !== +idParam){
        const idForServer = parseInt(idParam, 10);
        dispatch(getDataOpenFilmAction(idForServer));
        dispatch(getDataSimilarFilmsAction(idForServer));
        dispatch(getDataReviewsOpenFilm(idForServer));
      }}}, [dispatch, idParam, openedFilm]);

  if(idParam === undefined || isErrorResponse) {
    return < Navigate to={AppRoute.Error}/>;
  }
  if(openedFilm === undefined || openedFilm.id !== +idParam){
    return <LoadingScreen/>;
  }

  return (
    <>
      <ArtBoard/>
      {<MovieInfo openedFilm={openedFilm}/>}
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <CatalogFilmCardsInterface
            catalogFilter={CatalogFilm.SIMILAR_FILTER}
          />
        </section>
        <footer className="page-footer">
          <Logo footer/>
          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export const MoviePage = memo(MoviePageComponents);
