import { MouseEvent, useMemo } from 'react';
import { ALL_GENRE, SLICE_STEP } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllFilms } from '../../store/data-api-process/selectors';
import { mainFilterChangAction } from '../../store/filter-process/filter-process';
import { getFilter } from '../../store/filter-process/selectors';


const MAX_FILTER_COUNT = 9;
type MainGenreMenuProps = {
  setSlice:(slice:number)=>void;
}

function MainGenreMenu ({setSlice}:MainGenreMenuProps):JSX.Element {
  const dispatch = useAppDispatch();
  const genre = useAppSelector(getFilter);
  const allFilm = useAppSelector(getAllFilms);

  const filtersMemo = useMemo(()=>[ALL_GENRE, ...new Set(allFilm.map((film)=>film.genre))],[allFilm]);

  return(
    <ul className ="catalog__genres-list">
      { filtersMemo.slice(0, MAX_FILTER_COUNT).map((filter) => (
        <li key={filter} className = {`catalog__genres-item ${ genre === filter ? 'catalog__genres-item--active' : ''}`} >
          <a href="#top"
            onClick={(event:MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              setSlice(SLICE_STEP);
              dispatch(mainFilterChangAction(filter));
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

