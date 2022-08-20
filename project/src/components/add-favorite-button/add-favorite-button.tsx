import { MouseEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { postFavoriteFilmAction } from '../../store/api-action';

type AddFavoriteButtonProps = {
  isFavorite:boolean
  id:number
}

export function AddFavoriteButton ({isFavorite, id}:AddFavoriteButtonProps):JSX.Element{
  const dispatch = useAppDispatch();
  const changFavoriteHandler = (evt:MouseEvent<HTMLElement>)=>{
    evt.preventDefault();
      dispatch(postFavoriteFilmAction({idFilm:id, status:!isFavorite}));
    }
  return(
    <span onClick={changFavoriteHandler}>
      {isFavorite
        ?
        <svg viewBox="0 0 18 14" width="18" height="14">
          <use xlinkHref="#in-list"></use>
        </svg>
        :
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref="#add"></use>
        </svg>}
    </span>
  );
};
