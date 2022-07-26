import { MouseEvent, SetStateAction, useState } from 'react';
import { GenresFilter, MainGenreFilter } from '../const';

type MainGenreFilterProps = {
  filterName:string,
  setFilterName: (value:SetStateAction<string>)=>void
}

function MainGenreMenu (props:MainGenreFilterProps):JSX.Element {
  const [active, setActive] = useState(props.filterName);
  return(
    <ul className ="catalog__genres-list">
      { Object.entries(MainGenreFilter).map(([key, filter]) => {
        const keyValue:string = key;
        return (
          <li key={filter} className = {`catalog__genres-item ${ active === filter ? 'catalog__genres-item--active' : ''}`} >
            <a href="#top" id= {GenresFilter[keyValue]}
              onClick={(event:MouseEvent<HTMLAnchorElement>) => {
                event.preventDefault();
                setActive(filter);
                event.currentTarget.textContent !== null
                  ? props.setFilterName(event.currentTarget.id)
                  : props.setFilterName(GenresFilter.ALL_GENRES);
              }}
              className ="catalog__genres-link"
            >
              {filter}
            </a>
          </li>);}
      )}
    </ul>
  );
}
export {MainGenreMenu};

