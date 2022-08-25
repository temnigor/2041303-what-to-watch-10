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
      <li className={`film-nav__item ${tabsMeaning === NavMenuMoviePage.Overview ? 'film-nav__item--active' : ''}`}
        onClick={(event:MouseEvent<HTMLElement>) => {
          event.preventDefault();
          dispatch(tabsMeaningAction(NavMenuMoviePage.Overview));
        }}
      >
        <a href="#top" className="film-nav__link">Overview</a>
      </li>
      <li className={`film-nav__item ${tabsMeaning === NavMenuMoviePage.Details ? 'film-nav__item--active' : ''}`}
        onClick ={(event:MouseEvent<HTMLElement>) => {
          event.preventDefault();
          dispatch(tabsMeaningAction(NavMenuMoviePage.Details));
        }}
      >
        <a href="#top" className="film-nav__link">Details</a>
      </li>
      <li className={`film-nav__item ${tabsMeaning === NavMenuMoviePage.Reviews ? 'film-nav__item--active' : ''}`}
        onClick={(event:MouseEvent<HTMLElement>) => {
          event.preventDefault();
          dispatch(tabsMeaningAction(NavMenuMoviePage.Reviews));
        }}
      >
        <a href="#top" className="film-nav__link" >Reviews</a>
      </li>
    </>
  );
}
