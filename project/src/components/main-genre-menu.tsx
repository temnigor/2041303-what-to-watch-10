import { MouseEvent, useState } from 'react';
import { FilterMainNavMenu, GenresFilter } from '../const';

type MainGenreFilterProps = {
  filterName:string,
  onFilterChanges:(filter:string) => void
}

function MainGenreMenu (props:MainGenreFilterProps):JSX.Element {
  const [active, setActive] = useState(props.filterName);
  return(
    <ul className ="catalog__genres-list">
      { Object.values(FilterMainNavMenu).map((filter) => (
        <li key={filter} className = {`catalog__genres-item ${ active === GenresFilter[filter] && 'catalog__genres-item--active'}`} >
          <a href="#top"
            onClick={(event:MouseEvent<HTMLAnchorElement>) => {
              event.preventDefault();
              setActive(GenresFilter[filter]);
              props.onFilterChanges(GenresFilter[filter]);
            }}
            className ="catalog__genres-link"
          >
            {filter}
          </a>
        </li>)
      )}
    </ul>
  );
}
export {MainGenreMenu};

