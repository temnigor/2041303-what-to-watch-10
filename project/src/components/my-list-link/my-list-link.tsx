import { MouseEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoriteFilmAction, postFavoriteFilmAction } from '../../store/api-action';
import { getFavoriteFilms, getOpenedFilms, getIsErrorResponse } from '../../store/data-api-process/selectors';


export function MyListLink ():JSX.Element {
  const openedFilm = useAppSelector(getOpenedFilms);
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const isErrorResponse = useAppSelector(getIsErrorResponse);
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(favoriteFilms === undefined && isErrorResponse){
      dispatch(fetchFavoriteFilmAction);
    }
  },[dispatch,favoriteFilms,isErrorResponse]);
  if(openedFilm === undefined){
    return <div></div>;
  }
  const {id, isFavorite} = openedFilm;
  const changFavoriteHandler = (evt:MouseEvent<HTMLElement>)=>{
    evt.preventDefault();
    dispatch(postFavoriteFilmAction({filmId:id, status:!isFavorite}));
  };
  return(
    <button onClick={changFavoriteHandler} className ="btn btn--list film-card__button" type="button">
      {isFavorite
        ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
        :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}
