import { MouseEvent} from 'react';
import { AuthorizationStatus } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useFindFilm } from '../../hooks/findFilm';
import { postFavoriteFilmAction } from '../../store/api-action';
import { getFavoriteFilms } from '../../store/data-api-process/selectors';
import { getAuthorizationStatus } from '../../store/user-process/selectors';

type MyListLinkProps = {
  isPromoFilm:boolean
}

export function MyListLink ({isPromoFilm}:MyListLinkProps):JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const film = useFindFilm(isPromoFilm);
  if(film === undefined){
    return <div></div>;
  }
  const {id, isFavorite} = film;

  const handleFavoriteChang = (evt:MouseEvent<HTMLElement>)=>{
    evt.preventDefault();
    if(authorizationStatus === AuthorizationStatus.Auth){
      dispatch(postFavoriteFilmAction({filmId:id, status:!isFavorite, isPromoFilm: isPromoFilm}));
    }
  };
  return(
    <button onClick={handleFavoriteChang} className ="btn btn--list film-card__button" type="button">
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
