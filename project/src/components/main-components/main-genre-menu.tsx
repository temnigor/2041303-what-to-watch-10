import { MouseEvent } from "react";
import { FilterMainNavMenu, GenresFilter } from "../../const";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { mainFilterChangAction } from "../../store/main-genre-filter-process/main-genre-filter-process";
import { getFilter } from "../../store/main-genre-filter-process/selectors";


function MainGenreMenu ():JSX.Element {
  const dispatch = useAppDispatch();
  const genre = useAppSelector(getFilter);
  return(
    <ul className ="catalog__genres-list">
      { Object.values(FilterMainNavMenu).map((filter) => (
        <li key={filter} className = {`catalog__genres-item ${ genre === GenresFilter[filter] ? 'catalog__genres-item--active' : ''}`} >
          <a href="#top"
            onClick={(event:MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              dispatch(mainFilterChangAction(GenresFilter[filter]));
            }}
            className="catalog__genres-link"
          >
            {filter}
          </a>
        </li>)
      )}
    </ul>
  );
}
export {MainGenreMenu};

