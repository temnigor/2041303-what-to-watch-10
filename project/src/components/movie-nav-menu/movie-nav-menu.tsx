import { MouseEvent } from 'react';
import { NavMenuMoviePage } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { tabsMeaningAction } from '../../store/filter-process/filter-process';
import { getTabsMeaning } from '../../store/filter-process/selectors';

export function MovieNavMenu (){
  const dispatch = useAppDispatch();
  const tabsMeaning = useAppSelector(getTabsMeaning);
  return(
    <>
      <li className={`film-nav__item ${tabsMeaning === NavMenuMoviePage.OVERVIEW ? 'film-nav__item--active' : ''}`}
        onClick={(event:MouseEvent<HTMLElement>) => {
          event.preventDefault();
          dispatch(tabsMeaningAction(NavMenuMoviePage.OVERVIEW));
        }}
      >
        <a href="#top" className="film-nav__link">Overview</a>
      </li>
      <li className={`film-nav__item ${tabsMeaning === NavMenuMoviePage.DETAILS ? 'film-nav__item--active' : ''}`}
        onClick ={(event:MouseEvent<HTMLElement>) => {
          event.preventDefault();
          dispatch(tabsMeaningAction(NavMenuMoviePage.DETAILS));
        }}
      >
        <a href="#top" className="film-nav__link">Details</a>
      </li>
      <li className={`film-nav__item ${tabsMeaning === NavMenuMoviePage.REVIEWS ? 'film-nav__item--active' : ''}`}
        onClick={(event:MouseEvent<HTMLElement>) => {
          event.preventDefault();
          dispatch(tabsMeaningAction(NavMenuMoviePage.REVIEWS));
        }}
      >
        <a href="#top" className="film-nav__link" >Reviews</a>
      </li>
    </>
  );
}
